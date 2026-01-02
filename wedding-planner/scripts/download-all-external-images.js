/**
 * Comprehensive External Image Download Script
 * Downloads all external images and converts to optimized WebP
 * Run: node scripts/download-all-external-images.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { URL } = require('url');

const BASE_DIR = path.join(__dirname, '../public/images');

// Track all downloads
const downloadedImages = new Map();
let totalDownloaded = 0;
let totalFailed = 0;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function sanitizeFilename(url, prefix = '') {
  try {
    const urlObj = new URL(url);
    let filename = urlObj.pathname.split('/').pop() || 'image';
    filename = filename.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase();
    filename = filename.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
    if (prefix) filename = `${prefix}-${filename}`;
    return filename.substring(0, 50); // Limit length
  } catch {
    return `image-${Date.now()}`;
  }
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          downloadImage(redirectUrl, filepath).then(resolve).catch(reject);
          return;
        }
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => {
        const buffer = Buffer.concat(chunks);
        fs.writeFileSync(filepath, buffer);
        resolve(filepath);
      });
      response.on('error', reject);
    });

    request.on('error', reject);
    request.on('timeout', () => {
      request.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function optimizeToWebp(inputPath, outputPath, quality = 75) {
  try {
    await sharp(inputPath)
      .webp({ quality, effort: 4 })
      .toFile(outputPath);
    fs.unlinkSync(inputPath); // Remove original
    return true;
  } catch (error) {
    console.error(`  Failed to optimize: ${error.message}`);
    return false;
  }
}

async function processUrl(url, category, prefix = '') {
  if (!url || !url.startsWith('http')) return null;

  // Check if already downloaded
  if (downloadedImages.has(url)) {
    return downloadedImages.get(url);
  }

  const categoryDir = path.join(BASE_DIR, category);
  ensureDir(categoryDir);

  const filename = sanitizeFilename(url, prefix);
  const tempPath = path.join(categoryDir, `${filename}.tmp`);
  const finalPath = path.join(categoryDir, `${filename}.webp`);
  const relativePath = `/images/${category}/${filename}.webp`;

  // Check if already exists
  if (fs.existsSync(finalPath)) {
    downloadedImages.set(url, relativePath);
    return relativePath;
  }

  try {
    await downloadImage(url, tempPath);
    await optimizeToWebp(tempPath, finalPath);
    downloadedImages.set(url, relativePath);
    totalDownloaded++;
    process.stdout.write(`\r  Downloaded: ${totalDownloaded} | Failed: ${totalFailed}`);
    return relativePath;
  } catch (error) {
    totalFailed++;
    process.stdout.write(`\r  Downloaded: ${totalDownloaded} | Failed: ${totalFailed}`);
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    return null;
  }
}

// Process locations.json
async function processLocationsJson() {
  console.log('\n📍 Processing locations.json...');
  const locationsPath = path.join(__dirname, '../src/data/locations/locations.json');

  if (!fs.existsSync(locationsPath)) {
    console.log('  File not found, skipping.');
    return;
  }

  const data = JSON.parse(fs.readFileSync(locationsPath, 'utf8'));
  let modified = false;

  async function processObject(obj, pathStr = '') {
    if (!obj || typeof obj !== 'object') return;

    for (const key of Object.keys(obj)) {
      const value = obj[key];

      if (typeof value === 'string' && value.includes('unsplash.com')) {
        const category = pathStr.includes('venue') ? 'venues' : 'locations';
        const newPath = await processUrl(value, category, key);
        if (newPath) {
          obj[key] = newPath;
          modified = true;
        }
      } else if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          if (typeof value[i] === 'string' && value[i].includes('unsplash.com')) {
            const newPath = await processUrl(value[i], 'locations', `${key}-${i}`);
            if (newPath) {
              value[i] = newPath;
              modified = true;
            }
          } else if (typeof value[i] === 'object') {
            await processObject(value[i], `${pathStr}.${key}[${i}]`);
          }
        }
      } else if (typeof value === 'object') {
        await processObject(value, `${pathStr}.${key}`);
      }
    }
  }

  await processObject(data);

  if (modified) {
    fs.writeFileSync(locationsPath, JSON.stringify(data, null, 2));
    console.log('\n  ✓ Updated locations.json');
  }
}

// Process portfolio-content.tsx
async function processPortfolioContent() {
  console.log('\n🖼️ Processing portfolio-content.tsx...');
  const filePath = path.join(__dirname, '../src/app/portfolio/portfolio-content.tsx');

  if (!fs.existsSync(filePath)) {
    console.log('  File not found, skipping.');
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const urlRegex = /https:\/\/images\.unsplash\.com\/[^"'\s)]+/g;
  const matches = content.match(urlRegex) || [];

  console.log(`  Found ${matches.length} Unsplash URLs`);

  for (const url of [...new Set(matches)]) {
    const newPath = await processUrl(url, 'portfolio', 'gallery');
    if (newPath) {
      content = content.split(url).join(newPath);
    }
  }

  fs.writeFileSync(filePath, content);
  console.log('\n  ✓ Updated portfolio-content.tsx');
}

// Process venue JSON files
async function processVenueFiles() {
  console.log('\n🏰 Processing venue files...');
  const venuesDir = path.join(__dirname, '../src/data/venues');

  if (!fs.existsSync(venuesDir)) {
    console.log('  Directory not found, skipping.');
    return;
  }

  const files = fs.readdirSync(venuesDir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(venuesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const urlRegex = /https:\/\/images\.unsplash\.com\/[^"'\s]+/g;
    const matches = content.match(urlRegex) || [];

    if (matches.length === 0) continue;

    console.log(`  Processing ${file} (${matches.length} URLs)`);

    for (const url of [...new Set(matches)]) {
      const newPath = await processUrl(url, 'venues', file.replace('.json', ''));
      if (newPath) {
        content = content.split(url).join(newPath);
      }
    }

    fs.writeFileSync(filePath, content);
  }
  console.log('\n  ✓ Updated venue files');
}

// Process blog JSON files
async function processBlogFiles() {
  console.log('\n📝 Processing blog files...');
  const blogDir = path.join(__dirname, '../src/data/blog-posts');

  if (!fs.existsSync(blogDir)) {
    console.log('  Directory not found, skipping.');
    return;
  }

  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(blogDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const urlRegex = /https:\/\/(images\.unsplash\.com|www\.eliteweddingplanner\.in)[^"'\s]+/g;
    const matches = content.match(urlRegex) || [];

    if (matches.length === 0) continue;

    console.log(`  Processing ${file} (${matches.length} URLs)`);

    for (const url of [...new Set(matches)]) {
      const newPath = await processUrl(url, 'blog', file.replace('.json', ''));
      if (newPath) {
        content = content.split(url).join(newPath);
      }
    }

    fs.writeFileSync(filePath, content);
  }
  console.log('\n  ✓ Updated blog files');
}

// Process Instagram feed
async function processInstagramFeed() {
  console.log('\n📸 Processing instagram-feed.tsx...');
  const filePath = path.join(__dirname, '../src/components/home/instagram-feed.tsx');

  if (!fs.existsSync(filePath)) {
    console.log('  File not found, skipping.');
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const urlRegex = /https:\/\/images\.unsplash\.com\/[^"'\s)]+/g;
  const matches = content.match(urlRegex) || [];

  if (matches.length === 0) {
    console.log('  No URLs found, skipping.');
    return;
  }

  console.log(`  Found ${matches.length} Unsplash URLs`);

  for (const url of [...new Set(matches)]) {
    const newPath = await processUrl(url, 'instagram', 'feed');
    if (newPath) {
      content = content.split(url).join(newPath);
    }
  }

  fs.writeFileSync(filePath, content);
  console.log('\n  ✓ Updated instagram-feed.tsx');
}

// Process remaining TSX files
async function processRemainingFiles() {
  console.log('\n🔧 Processing remaining TSX files...');

  const filesToProcess = [
    '../src/components/layout/mega-menu.tsx',
    '../src/components/layout/navbar.tsx',
    '../src/components/layout/footer.tsx',
    '../src/components/services/services-client.tsx',
    '../src/app/destinations/page.tsx',
    '../src/app/destinations/[slug]/page.tsx',
    '../src/app/portfolio/page.tsx',
    '../src/app/about/page.tsx',
    '../src/app/services/page.tsx',
    '../src/app/blog/page.tsx',
    '../src/app/contact/contact-client.tsx',
  ];

  for (const relPath of filesToProcess) {
    const filePath = path.join(__dirname, relPath);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');
    const urlRegex = /https:\/\/(images\.unsplash\.com|www\.eliteweddingplanner\.in)[^"'\s)]+/g;
    const matches = content.match(urlRegex) || [];

    if (matches.length === 0) continue;

    const filename = path.basename(filePath);
    console.log(`  Processing ${filename} (${matches.length} URLs)`);

    for (const url of [...new Set(matches)]) {
      const category = filename.includes('destination') ? 'destinations'
        : filename.includes('service') ? 'services'
        : filename.includes('portfolio') ? 'portfolio'
        : 'misc';
      const newPath = await processUrl(url, category, filename.replace('.tsx', ''));
      if (newPath) {
        content = content.split(url).join(newPath);
      }
    }

    fs.writeFileSync(filePath, content);
  }
  console.log('\n  ✓ Updated remaining files');
}

// Main execution
async function main() {
  console.log('🚀 Starting comprehensive image download...');
  console.log('================================================\n');

  const startTime = Date.now();

  // Ensure directories exist
  ['locations', 'portfolio', 'venues', 'blog', 'instagram', 'misc'].forEach(dir => {
    ensureDir(path.join(BASE_DIR, dir));
  });

  // Process all files
  await processLocationsJson();
  await processPortfolioContent();
  await processVenueFiles();
  await processBlogFiles();
  await processInstagramFeed();
  await processRemainingFiles();

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n================================================');
  console.log(`✅ Complete! Downloaded ${totalDownloaded} images, ${totalFailed} failed`);
  console.log(`⏱️ Time: ${duration}s`);
  console.log('================================================\n');
}

main().catch(console.error);
