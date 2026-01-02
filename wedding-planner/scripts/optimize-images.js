/**
 * Image Optimization Script
 * Converts images to AVIF/WebP with lossy compression
 * Run: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');

// Compression settings for different image types
const COMPRESSION_SETTINGS = {
  hero: { quality: 75, width: 1920 },
  gallery: { quality: 70, width: 1200 },
  thumbnail: { quality: 65, width: 400 },
  icon: { quality: 80, width: 128 }
};

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function optimizeImage(inputPath, outputBaseName, settings = COMPRESSION_SETTINGS.gallery) {
  const { quality, width } = settings;

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Calculate height to maintain aspect ratio
    const aspectRatio = metadata.height / metadata.width;
    const newHeight = Math.round(width * aspectRatio);

    // Generate WebP
    await image
      .resize(width, newHeight, { fit: 'cover', withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(`${outputBaseName}.webp`);

    // Generate AVIF
    await image
      .resize(width, newHeight, { fit: 'cover', withoutEnlargement: true })
      .avif({ quality: quality - 5, effort: 6 })
      .toFile(`${outputBaseName}.avif`);

    console.log(`✓ Optimized: ${path.basename(inputPath)}`);
    return true;
  } catch (error) {
    console.error(`✗ Failed: ${path.basename(inputPath)} - ${error.message}`);
    return false;
  }
}

async function processDirectory(dir, settings = COMPRESSION_SETTINGS.gallery) {
  await ensureDir(OUTPUT_DIR);

  const files = fs.readdirSync(dir);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));

  console.log(`\nProcessing ${imageFiles.length} images from ${dir}...\n`);

  let success = 0;
  let failed = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(dir, file);
    const baseName = path.parse(file).name;
    const outputBaseName = path.join(OUTPUT_DIR, baseName);

    const result = await optimizeImage(inputPath, outputBaseName, settings);
    if (result) success++;
    else failed++;
  }

  console.log(`\n✅ Completed: ${success} optimized, ${failed} failed\n`);
}

// Process all image directories
async function processAll() {
  const directories = [
    { path: path.join(INPUT_DIR, 'heroes'), settings: COMPRESSION_SETTINGS.hero },
    { path: path.join(INPUT_DIR, 'destinations'), settings: COMPRESSION_SETTINGS.gallery },
    { path: path.join(INPUT_DIR, 'services'), settings: COMPRESSION_SETTINGS.gallery },
    { path: path.join(INPUT_DIR, 'portfolio'), settings: COMPRESSION_SETTINGS.gallery },
    { path: path.join(INPUT_DIR, 'blog'), settings: COMPRESSION_SETTINGS.gallery },
    { path: path.join(INPUT_DIR, 'team'), settings: COMPRESSION_SETTINGS.gallery },
    { path: path.join(INPUT_DIR, 'icons'), settings: COMPRESSION_SETTINGS.icon },
    { path: path.join(INPUT_DIR, 'decorative'), settings: COMPRESSION_SETTINGS.thumbnail },
    { path: path.join(INPUT_DIR, 'venues'), settings: COMPRESSION_SETTINGS.gallery },
    { path: path.join(INPUT_DIR, 'testimonials'), settings: COMPRESSION_SETTINGS.thumbnail }
  ];

  for (const { path: dirPath, settings } of directories) {
    if (fs.existsSync(dirPath)) {
      await processDirectory(dirPath, settings);
    }
  }
}

// Run if called directly
if (require.main === module) {
  processAll().catch(console.error);
}

module.exports = { optimizeImage, processDirectory, processAll, COMPRESSION_SETTINGS };
