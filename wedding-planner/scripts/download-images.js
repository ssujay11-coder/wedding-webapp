/**
 * Image Download and Optimization Script
 * Downloads curated high-quality wedding images and optimizes them
 * Run: node scripts/download-images.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const BASE_DIR = path.join(__dirname, '../public/images');

// Curated Unsplash image URLs for Indian luxury weddings
// These are direct Unsplash photo URLs with appropriate resolution
const IMAGES = {
  heroes: [
    {
      filename: 'home-hero',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',
      alt: 'Luxury Indian wedding couple'
    },
    {
      filename: 'about-hero',
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=80',
      alt: 'Grand wedding venue'
    },
    {
      filename: 'services-hero',
      url: 'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=1920&q=80',
      alt: 'Wedding planning setup'
    },
    {
      filename: 'contact-hero',
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920&q=80',
      alt: 'Wedding couple hands'
    },
    {
      filename: 'portfolio-hero',
      url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=80',
      alt: 'Indian wedding ceremony'
    },
    {
      filename: 'venues-hero',
      url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80',
      alt: 'Luxury wedding venue'
    }
  ],
  destinations: [
    {
      filename: 'udaipur',
      url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80',
      alt: 'Lake Palace Udaipur'
    },
    {
      filename: 'goa',
      url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
      alt: 'Goa beach wedding'
    },
    {
      filename: 'jaipur',
      url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80',
      alt: 'Jaipur palace'
    },
    {
      filename: 'jodhpur',
      url: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=1200&q=80',
      alt: 'Mehrangarh Fort Jodhpur'
    },
    {
      filename: 'dubai',
      url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
      alt: 'Dubai skyline'
    },
    {
      filename: 'thailand',
      url: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200&q=80',
      alt: 'Thailand beach resort'
    },
    {
      filename: 'kerala',
      url: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=1200&q=80',
      alt: 'Kerala backwaters'
    },
    {
      filename: 'mumbai',
      url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&q=80',
      alt: 'Mumbai city'
    }
  ],
  services: [
    {
      filename: 'complete-planning',
      url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=80',
      alt: 'Wedding planning materials'
    },
    {
      filename: 'guest-management',
      url: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&q=80',
      alt: 'Wedding guests welcome'
    },
    {
      filename: 'hospitality',
      url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
      alt: 'Luxury hotel suite'
    },
    {
      filename: 'entertainment',
      url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80',
      alt: 'Wedding entertainment'
    },
    {
      filename: 'decor',
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80',
      alt: 'Wedding flowers decor'
    },
    {
      filename: 'food-beverage',
      url: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80',
      alt: 'Indian wedding food'
    },
    {
      filename: 'logistics',
      url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80',
      alt: 'Luxury vehicles'
    },
    {
      filename: 'technical',
      url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80',
      alt: 'Event lighting stage'
    },
    {
      filename: 'crew',
      url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80',
      alt: 'Professional team'
    }
  ],
  portfolio: [
    {
      filename: 'palace-wedding-1',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&q=80',
      alt: 'Palace wedding ceremony'
    },
    {
      filename: 'palace-wedding-2',
      url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1600&q=80',
      alt: 'Royal palace wedding'
    },
    {
      filename: 'beach-wedding-1',
      url: 'https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=1600&q=80',
      alt: 'Beach wedding ceremony'
    },
    {
      filename: 'beach-wedding-2',
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=80',
      alt: 'Beach wedding decor'
    },
    {
      filename: 'heritage-wedding-1',
      url: 'https://images.unsplash.com/photo-1549417229-7686ac5595fd?w=1600&q=80',
      alt: 'Heritage wedding'
    },
    {
      filename: 'urban-wedding-1',
      url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1600&q=80',
      alt: 'Urban luxury wedding'
    },
    {
      filename: 'intimate-wedding-1',
      url: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=1600&q=80',
      alt: 'Intimate garden wedding'
    },
    {
      filename: 'mandap-ceremony',
      url: 'https://images.unsplash.com/photo-1604608672516-f1b9a03debbd?w=1600&q=80',
      alt: 'Hindu mandap ceremony'
    },
    {
      filename: 'sangeet-night',
      url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=80',
      alt: 'Sangeet celebration'
    },
    {
      filename: 'mehndi-ceremony',
      url: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=1600&q=80',
      alt: 'Mehndi ceremony'
    }
  ],
  blog: [
    {
      filename: 'budget-planning',
      url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
      alt: 'Wedding budget planning'
    },
    {
      filename: 'timeline',
      url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=80',
      alt: 'Wedding planning timeline'
    },
    {
      filename: 'vendor-selection',
      url: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1200&q=80',
      alt: 'Vendor meeting'
    },
    {
      filename: 'destination-guide',
      url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80',
      alt: 'Travel destination'
    },
    {
      filename: 'trends-2025',
      url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=80',
      alt: 'Wedding trends'
    },
    {
      filename: 'pre-wedding',
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80',
      alt: 'Pre-wedding photoshoot'
    },
    {
      filename: 'goa-vs-udaipur',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
      alt: 'Beach vs palace wedding'
    },
    {
      filename: 'luxury-wedding',
      url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80',
      alt: 'Luxury wedding setup'
    }
  ],
  testimonials: [
    {
      filename: 'couple-1',
      url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      alt: 'Happy bride'
    },
    {
      filename: 'couple-2',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      alt: 'Happy couple portrait'
    },
    {
      filename: 'couple-3',
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      alt: 'Woman portrait'
    },
    {
      filename: 'couple-4',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      alt: 'Man portrait'
    }
  ],
  decorative: [
    {
      filename: 'flowers-overlay',
      url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80',
      alt: 'Flowers'
    },
    {
      filename: 'rose-petals',
      url: 'https://images.unsplash.com/photo-1518882605630-8def0e707858?w=800&q=80',
      alt: 'Rose petals'
    },
    {
      filename: 'candles',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      alt: 'Candles decoration'
    }
  ],
  venues: [
    {
      filename: 'taj-palace',
      url: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80',
      alt: 'Taj Hotel'
    },
    {
      filename: 'leela-palace',
      url: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=80',
      alt: 'Palace hotel'
    },
    {
      filename: 'oberoi',
      url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
      alt: 'Luxury resort'
    },
    {
      filename: 'itc-grand',
      url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
      alt: 'Grand hotel'
    },
    {
      filename: 'palace-1',
      url: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=80',
      alt: 'Historic palace venue'
    },
    {
      filename: 'beach-resort',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
      alt: 'Beach resort venue'
    }
  ]
};

// Ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Optimize image to WebP and AVIF
async function optimizeImage(inputPath, outputDir, filename) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Generate WebP
    await image
      .webp({ quality: 75, effort: 6 })
      .toFile(path.join(outputDir, `${filename}.webp`));

    // Generate AVIF
    await image
      .avif({ quality: 70, effort: 6 })
      .toFile(path.join(outputDir, `${filename}.avif`));

    // Remove original JPG
    fs.unlinkSync(inputPath);

    console.log(`  ✓ Optimized: ${filename}.webp + ${filename}.avif`);
    return true;
  } catch (error) {
    console.error(`  ✗ Failed to optimize ${filename}: ${error.message}`);
    return false;
  }
}

// Process a category of images
async function processCategory(category, images) {
  const categoryDir = path.join(BASE_DIR, category);
  ensureDir(categoryDir);

  console.log(`\n📁 Processing ${category}...`);

  for (const img of images) {
    const tempPath = path.join(categoryDir, `${img.filename}.tmp.jpg`);

    try {
      console.log(`  ⬇ Downloading ${img.filename}...`);
      await downloadImage(img.url, tempPath);
      await optimizeImage(tempPath, categoryDir, img.filename);
    } catch (error) {
      console.error(`  ✗ Error with ${img.filename}: ${error.message}`);
    }

    // Small delay to be respectful to Unsplash
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

// Main execution
async function main() {
  console.log('🖼️  Wedding Image Download & Optimization Script');
  console.log('================================================\n');

  ensureDir(BASE_DIR);

  // Process all categories
  for (const [category, images] of Object.entries(IMAGES)) {
    await processCategory(category, images);
  }

  // Create couples directory and copy hero
  const couplesDir = path.join(BASE_DIR, 'couples');
  ensureDir(couplesDir);

  // Copy home-hero to couples/hero-bg for backward compatibility
  const heroSrc = path.join(BASE_DIR, 'heroes', 'home-hero.webp');
  const heroDest = path.join(couplesDir, 'hero-bg.webp');
  if (fs.existsSync(heroSrc)) {
    fs.copyFileSync(heroSrc, heroDest);
    console.log('\n✓ Created couples/hero-bg.webp for backward compatibility');
  }

  console.log('\n✅ All images downloaded and optimized!');
  console.log('   Images are in: public/images/');
  console.log('   Formats: .webp and .avif');
}

// Run
main().catch(console.error);
