#!/usr/bin/env node
/**
 * Image Optimization & Organization Script for Elite Wedding Planner
 *
 * This script:
 * 1. Scans the PHOTOS folder for wedding images
 * 2. Analyzes and categorizes them (venues, couples, decor, etc.)
 * 3. Converts to WebP format with multiple sizes
 * 4. Organizes into the public/images folder structure
 *
 * Usage: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
  sourceDir: path.join(__dirname, '../../PHOTOS'),
  outputDir: path.join(__dirname, '../public/images/gallery'),

  // Image sizes for responsive design
  sizes: {
    thumbnail: { width: 400, suffix: '-thumb' },
    medium: { width: 800, suffix: '-md' },
    large: { width: 1200, suffix: '-lg' },
    hero: { width: 1920, suffix: '-hero' }
  },

  // WebP quality settings
  quality: {
    webp: 82,
    avif: 75,
  },

  // Category detection patterns
  categories: {
    couples: [
      /couple/i, /bride/i, /groom/i, /wedding.*portrait/i,
      /SDak/i, /portrait/i, /0A8A/i, /VIV_/i, /HAK_/i
    ],
    venues: [
      /venue/i, /hall/i, /palace/i, /hotel/i, /location/i,
      /4G4A/i, /mandap/i, /setup/i, /beach/i
    ],
    decor: [
      /decor/i, /floral/i, /flower/i, /lighting/i,
      /PP-/i, /decoration/i, /centerpiece/i
    ],
    ceremonies: [
      /haldi/i, /mehendi/i, /sangeet/i, /wedding/i, /ceremony/i,
      /RNF/i, /reception/i, /phera/i, /vidai/i
    ],
    entertainment: [
      /music/i, /dance/i, /dhol/i, /entertainment/i,
      /MOD_/i, /performance/i
    ],
    food: [
      /food/i, /cake/i, /catering/i, /cuisine/i, /dinner/i
    ],
    guests: [
      /guest/i, /family/i, /celebration/i, /party/i, /NIDHI/i
    ]
  }
};

// Statistics tracking
const stats = {
  processed: 0,
  skipped: 0,
  errors: [],
  categorized: {},
  totalInputSize: 0,
  totalOutputSize: 0
};

/**
 * Detect image category based on filename
 */
function detectCategory(filename) {
  for (const [category, patterns] of Object.entries(CONFIG.categories)) {
    for (const pattern of patterns) {
      if (pattern.test(filename)) {
        return category;
      }
    }
  }
  return 'portfolio';
}

/**
 * Generate a clean, SEO-friendly filename
 */
function generateCleanFilename(originalName, index, category) {
  const baseName = path.basename(originalName, path.extname(originalName));
  let cleanName = baseName
    .replace(/\s*\([^)]*\)\s*/g, '')
    .replace(/[_-]+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase()
    .substring(0, 50);

  return `${category}-${String(index).padStart(3, '0')}-${cleanName || 'image'}`;
}

/**
 * Process a single image
 */
async function processImage(inputPath, outputBasePath, filename) {
  try {
    const inputStats = await fs.stat(inputPath);
    stats.totalInputSize += inputStats.size;

    const image = sharp(inputPath);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      stats.skipped++;
      return null;
    }

    const results = {};

    for (const [sizeName, sizeConfig] of Object.entries(CONFIG.sizes)) {
      if (sizeConfig.width > metadata.width) continue;

      const outputFilename = `${outputBasePath}${sizeConfig.suffix}.webp`;

      await sharp(inputPath)
        .resize(sizeConfig.width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: CONFIG.quality.webp })
        .toFile(outputFilename);

      const outputStats = await fs.stat(outputFilename);
      stats.totalOutputSize += outputStats.size;
      results[sizeName] = { path: outputFilename, size: outputStats.size };
    }

    // AVIF for hero images
    if (metadata.width >= 1200) {
      const avifPath = `${outputBasePath}-hero.avif`;
      await sharp(inputPath)
        .resize(1920, null, { withoutEnlargement: true, fit: 'inside' })
        .avif({ quality: CONFIG.quality.avif })
        .toFile(avifPath);
      results.avif = { path: avifPath };
    }

    stats.processed++;
    return results;

  } catch (error) {
    stats.errors.push({ file: filename, error: error.message });
    return null;
  }
}

/**
 * Scan source directory for images
 */
async function scanSourceDirectory(dir) {
  const images = [];
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.JPG', '.JPEG', '.PNG'];

  async function scan(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        await scan(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (validExtensions.includes(ext) || validExtensions.includes(ext.toLowerCase())) {
          images.push({
            path: fullPath,
            name: entry.name,
            relativePath: path.relative(dir, fullPath)
          });
        }
      }
    }
  }

  await scan(dir);
  return images;
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Main execution
 */
async function main() {
  console.log('\n🎨 Elite Wedding Planner - Image Optimization Tool\n');
  console.log('='.repeat(60));

  try {
    await fs.access(CONFIG.sourceDir);
  } catch {
    console.error(`❌ Source directory not found: ${CONFIG.sourceDir}`);
    process.exit(1);
  }

  console.log(`\n📁 Scanning: ${CONFIG.sourceDir}`);
  const images = await scanSourceDirectory(CONFIG.sourceDir);
  console.log(`   Found ${images.length} images\n`);

  if (images.length === 0) {
    console.log('No images found.');
    return;
  }

  // Categorize
  const categorized = {};
  for (const image of images) {
    const category = detectCategory(image.name);
    if (!categorized[category]) categorized[category] = [];
    categorized[category].push(image);
  }

  console.log('📊 Categorization:');
  for (const [category, imgs] of Object.entries(categorized)) {
    console.log(`   ${category}: ${imgs.length} images`);
    stats.categorized[category] = imgs.length;
  }

  // Create directories
  for (const category of Object.keys(categorized)) {
    await fs.mkdir(path.join(CONFIG.outputDir, category), { recursive: true });
  }

  console.log('\n🔄 Processing...\n');

  for (const [category, categoryImages] of Object.entries(categorized)) {
    console.log(`📂 ${category} (${categoryImages.length}):`);
    const categoryDir = path.join(CONFIG.outputDir, category);

    let idx = 1;
    for (const image of categoryImages) {
      const cleanFilename = generateCleanFilename(image.name, idx, category);
      const outputBasePath = path.join(categoryDir, cleanFilename);

      const shortName = image.name.length > 35 ? image.name.substring(0, 35) + '...' : image.name;
      process.stdout.write(`   ${shortName.padEnd(40)} `);

      const result = await processImage(image.path, outputBasePath, image.name);

      if (result) {
        console.log('✅');
        idx++;
      } else {
        console.log('⏭️');
      }
    }
  }

  // Generate manifest
  const manifest = {
    generated: new Date().toISOString(),
    statistics: {
      totalImages: stats.processed,
      inputSize: stats.totalInputSize,
      outputSize: stats.totalOutputSize,
      compressionRatio: ((1 - stats.totalOutputSize / stats.totalInputSize) * 100).toFixed(1) + '%'
    },
    categories: Object.fromEntries(
      Object.entries(categorized).map(([cat, imgs]) => [
        cat,
        { count: imgs.length, path: `/images/gallery/${cat}` }
      ])
    )
  };

  await fs.writeFile(
    path.join(CONFIG.outputDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log('\n' + '='.repeat(60));
  console.log('📈 COMPLETE\n');
  console.log(`   ✅ Processed: ${stats.processed}`);
  console.log(`   ⏭️  Skipped: ${stats.skipped}`);
  console.log(`   ❌ Errors: ${stats.errors.length}`);
  console.log(`\n   📦 Input size: ${formatBytes(stats.totalInputSize)}`);
  console.log(`   📦 Output size: ${formatBytes(stats.totalOutputSize)}`);
  console.log(`   💾 Saved: ${manifest.statistics.compressionRatio}`);
  console.log(`\n   Output: ${CONFIG.outputDir}`);

  if (stats.errors.length > 0) {
    console.log('\n⚠️  Errors:');
    stats.errors.slice(0, 5).forEach(e => console.log(`   - ${e.file}: ${e.error}`));
  }

  console.log('\n');
}

main().catch(console.error);
