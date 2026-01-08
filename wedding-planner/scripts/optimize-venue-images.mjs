import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const venuesDir = path.join(__dirname, '../public/images/venues');

const venuesDirs = [
  'oberoi-udaivilas',
  'taj-lake-palace',
  'leela-palace-udaipur',
  'taj-exotica-goa',
  'umaid-bhawan',
  'rambagh-palace',
  'w-goa',
  'park-hyatt-goa'
];

async function optimizeImages() {
  for (const venueDir of venuesDirs) {
    const dirPath = path.join(venuesDir, venueDir);

    if (!fs.existsSync(dirPath)) {
      console.log(`Skipping ${venueDir} - directory not found`);
      continue;
    }

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('-temp.jpg'));

    for (const file of files) {
      const inputPath = path.join(dirPath, file);
      const outputName = file.replace('-temp.jpg', '.webp');
      const outputPath = path.join(dirPath, outputName);

      try {
        const isHero = file.includes('hero');

        await sharp(inputPath)
          .resize(isHero ? 1920 : 1200, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({
            quality: isHero ? 85 : 80,
            effort: 6
          })
          .toFile(outputPath);

        // Get file sizes for comparison
        const inputSize = fs.statSync(inputPath).size;
        const outputSize = fs.statSync(outputPath).size;
        const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);

        console.log(`✓ ${venueDir}/${outputName} - ${(outputSize/1024).toFixed(0)}KB (${savings}% smaller)`);

        // Remove temp file
        fs.unlinkSync(inputPath);
      } catch (err) {
        console.error(`✗ Error processing ${file}:`, err.message);
      }
    }
  }

  console.log('\n✅ Image optimization complete!');
}

optimizeImages().catch(console.error);
