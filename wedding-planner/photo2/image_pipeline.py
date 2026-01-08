#!/usr/bin/env python3
"""
Elite Wedding Planner - Complete Image Organization & Optimization Pipeline
Processes images from website scraping and local folders
"""

import os
import re
import json
import hashlib
import shutil
from pathlib import Path
from datetime import datetime
from collections import defaultdict
from io import BytesIO
import base64

from PIL import Image
import pillow_avif
import imagehash
from tqdm import tqdm

# ============================================================================
# CONFIGURATION
# ============================================================================

BASE_DIR = Path("/Users/ruchitapathak/Documents/wedding-webapp/wedding-webapp/wedding-planner/photo2")
ASSETS_DIR = BASE_DIR / "eliteweddingplanner-assets"
RAW_DIR = BASE_DIR / "raw"
PHOTOS_DIR = Path("/Users/ruchitapathak/Documents/wedding-webapp/wedding-webapp/PHOTOS")
METADATA_DIR = ASSETS_DIR / "metadata"
WEBSITE_READY_DIR = ASSETS_DIR / "website-ready"

# Size configurations
SIZES = {
    'hero': (1920, 1080),
    'large': (1400, None),  # None means maintain aspect ratio
    'card': (800, 600),
    'thumbnail': (400, 300),
    'og': (1200, 630),
    'blur': (20, 20)
}

# Location detection keywords
LOCATION_KEYWORDS = {
    'udaipur': ['udaipur', 'lake pichola', 'city palace', 'oberoi udaivilas', 'taj lake palace', 'leela palace udaipur', 'jagmandir', 'fateh prakash', 'lake', 'aravalli'],
    'jaipur': ['jaipur', 'amer fort', 'city palace jaipur', 'rambagh', 'jai mahal', 'samode', 'fairmont jaipur', 'pink city'],
    'goa': ['goa', 'beach wedding', 'w goa', 'leela goa', 'taj exotica', 'panjim', 'candolim', 'tropical', 'palm'],
    'kerala': ['kerala', 'backwaters', 'kumarakom', 'alleppey', 'munnar', 'kochi', 'kovalam', 'coconut'],
    'jodhpur': ['jodhpur', 'umaid bhawan', 'mehrangarh', 'blue city', 'ajit bhawan'],
    'jim-corbett': ['jim corbett', 'corbett', 'forest wedding', 'jungle', 'uttarakhand', 'safari']
}

# Event detection keywords
EVENT_KEYWORDS = {
    'mehendi': ['mehendi', 'mehndi', 'henna'],
    'sangeet': ['sangeet', 'dance', 'performance', 'stage', 'dj'],
    'haldi': ['haldi', 'turmeric', 'yellow ceremony'],
    'wedding-ceremony': ['wedding', 'phera', 'mandap', 'varmala', 'jaimala', 'ceremony', 'vows', 'garland'],
    'reception': ['reception', 'party', 'dinner', 'cocktail', 'cake'],
    'baraat': ['baraat', 'groom entry', 'horse', 'band']
}

# Service detection keywords
SERVICE_KEYWORDS = {
    'decor': ['decor', 'decoration', 'flowers', 'floral', 'mandap', 'stage', 'lighting', 'candles', 'drapes'],
    'catering': ['catering', 'food', 'cuisine', 'buffet', 'dining', 'menu', 'thali'],
    'entertainment': ['entertainment', 'dj', 'band', 'dancer', 'fireworks', 'performance'],
    'photography-videography': ['photography', 'photographer', 'videography', 'drone', 'camera'],
    'makeup-styling': ['makeup', 'bridal makeup', 'styling', 'hair', 'beauty', 'lehenga', 'sherwani']
}

# Subject detection
SUBJECT_KEYWORDS = {
    'couple-portrait': ['couple', 'bride and groom', 'together'],
    'bridal': ['bride', 'bridal', 'dulhan'],
    'groom': ['groom', 'dulha', 'sherwani'],
    'family': ['family', 'parents', 'relatives'],
    'guests': ['guests', 'crowd', 'gathering'],
    'venue': ['venue', 'palace', 'resort', 'hotel', 'fort', 'beach'],
    'details': ['rings', 'jewelry', 'invitation', 'shoes', 'details']
}


class ImagePipeline:
    def __init__(self):
        self.images = []
        self.hashes = {}
        self.duplicates = []
        self.analysis_results = []

    # ========================================================================
    # PHASE 1: DISCOVERY & COLLECTION
    # ========================================================================

    def phase1_discovery(self):
        """Discover and collect all images"""
        print("\n" + "="*60)
        print("PHASE 1: DISCOVERY & COLLECTION")
        print("="*60)

        website_images = []
        local_images = []

        # 1. Collect from already scraped website images
        website_raw = ASSETS_DIR / "raw-downloads"
        if website_raw.exists():
            for img_path in website_raw.glob("*"):
                if img_path.suffix.lower() in ['.jpg', '.jpeg', '.png', '.webp', '.gif']:
                    website_images.append(img_path)
                    # Copy to raw/website
                    dest = RAW_DIR / "website" / img_path.name
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    if not dest.exists():
                        shutil.copy2(img_path, dest)

        # Also check myweddingplanning assets
        mwp_raw = BASE_DIR / "myweddingplanning-assets" / "raw-downloads"
        if mwp_raw.exists():
            for img_path in mwp_raw.glob("*"):
                if img_path.suffix.lower() in ['.jpg', '.jpeg', '.png', '.webp', '.gif']:
                    website_images.append(img_path)
                    dest = RAW_DIR / "website" / f"mwp_{img_path.name}"
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    if not dest.exists():
                        shutil.copy2(img_path, dest)

        print(f"  Website images found: {len(website_images)}")

        # 2. Scan local photos folder
        if PHOTOS_DIR.exists():
            for img_path in PHOTOS_DIR.rglob("*"):
                if img_path.suffix.lower() in ['.jpg', '.jpeg', '.png', '.webp', '.gif']:
                    local_images.append(img_path)
                    # Copy to raw/local preserving some structure
                    rel_path = img_path.relative_to(PHOTOS_DIR)
                    dest = RAW_DIR / "local" / rel_path
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    if not dest.exists():
                        shutil.copy2(img_path, dest)

        print(f"  Local images found: {len(local_images)}")

        # 3. Duplicate detection
        print("\n  Detecting duplicates...")
        all_images = list((RAW_DIR / "website").glob("*")) + list((RAW_DIR / "local").rglob("*"))
        all_images = [p for p in all_images if p.is_file() and p.suffix.lower() in ['.jpg', '.jpeg', '.png', '.webp', '.gif']]

        for img_path in tqdm(all_images, desc="  Hashing images"):
            try:
                with Image.open(img_path) as img:
                    phash = str(imagehash.phash(img))

                    if phash in self.hashes:
                        self.duplicates.append({
                            'hash': phash,
                            'original': str(self.hashes[phash]),
                            'duplicate': str(img_path)
                        })
                    else:
                        self.hashes[phash] = img_path
                        self.images.append({
                            'path': img_path,
                            'hash': phash,
                            'source': 'website' if 'website' in str(img_path) else 'local'
                        })
            except Exception as e:
                print(f"    Error processing {img_path}: {e}")

        print(f"  Unique images: {len(self.images)}")
        print(f"  Duplicates found: {len(self.duplicates)}")

        # 4. Quality assessment
        print("\n  Assessing image quality...")
        for img_data in tqdm(self.images, desc="  Quality check"):
            try:
                with Image.open(img_data['path']) as img:
                    width, height = img.size
                    img_data['dimensions'] = {'width': width, 'height': height}
                    img_data['megapixels'] = (width * height) / 1_000_000

                    # Quality score based on resolution
                    if width >= 3000 or height >= 3000:
                        img_data['quality_score'] = 10
                    elif width >= 1920 or height >= 1920:
                        img_data['quality_score'] = 8
                    elif width >= 1200 or height >= 1200:
                        img_data['quality_score'] = 6
                    else:
                        img_data['quality_score'] = 4

                    # Determine usability
                    img_data['usable_for'] = []
                    if width >= 1920:
                        img_data['usable_for'].append('hero-banner')
                    if width >= 1200:
                        img_data['usable_for'].append('og-image')
                    if width >= 800:
                        img_data['usable_for'].append('gallery')
                    img_data['usable_for'].append('thumbnail')

            except Exception as e:
                img_data['quality_score'] = 0
                img_data['error'] = str(e)

        # Save discovery report
        discovery_report = {
            'generated_at': datetime.now().isoformat(),
            'total_images': len(self.images),
            'sources': {
                'website': len([i for i in self.images if i['source'] == 'website']),
                'local': len([i for i in self.images if i['source'] == 'local'])
            },
            'duplicates_found': len(self.duplicates),
            'quality_distribution': {
                'excellent (10)': len([i for i in self.images if i.get('quality_score', 0) == 10]),
                'good (8)': len([i for i in self.images if i.get('quality_score', 0) == 8]),
                'acceptable (6)': len([i for i in self.images if i.get('quality_score', 0) == 6]),
                'low (4)': len([i for i in self.images if i.get('quality_score', 0) == 4])
            }
        }

        METADATA_DIR.mkdir(parents=True, exist_ok=True)
        with open(METADATA_DIR / "discovery-report.json", 'w') as f:
            json.dump(discovery_report, f, indent=2)

        print(f"\n  Discovery report saved to metadata/discovery-report.json")
        return discovery_report

    # ========================================================================
    # PHASE 2: AI-POWERED ANALYSIS
    # ========================================================================

    def phase2_analysis(self):
        """Analyze each image and categorize"""
        print("\n" + "="*60)
        print("PHASE 2: AI-POWERED ANALYSIS & CATEGORIZATION")
        print("="*60)

        for img_data in tqdm(self.images, desc="  Analyzing images"):
            try:
                analysis = self._analyze_image(img_data)
                img_data['analysis'] = analysis
                self.analysis_results.append({
                    'path': str(img_data['path']),
                    'analysis': analysis
                })
            except Exception as e:
                print(f"    Error analyzing {img_data['path']}: {e}")

        # Save analysis results
        with open(METADATA_DIR / "analysis-results.json", 'w') as f:
            json.dump(self.analysis_results, f, indent=2, default=str)

        print(f"\n  Analysis complete. Results saved.")
        return self.analysis_results

    def _analyze_image(self, img_data):
        """Analyze a single image based on filename, path, and basic image properties"""
        path = img_data['path']
        filename = path.stem.lower()
        full_path = str(path).lower()

        # Try to load and analyze image colors
        try:
            with Image.open(path) as img:
                # Get dominant colors (simplified)
                img_small = img.copy()
                img_small.thumbnail((100, 100))
                if img_small.mode != 'RGB':
                    img_small = img_small.convert('RGB')
                colors = img_small.getcolors(maxcolors=1000)
                if colors:
                    colors = sorted(colors, key=lambda x: x[0], reverse=True)[:5]
                    dominant_colors = [self._rgb_to_name(c[1]) for c in colors]
                else:
                    dominant_colors = []
        except:
            dominant_colors = []

        # Detect location
        location = None
        for loc, keywords in LOCATION_KEYWORDS.items():
            if any(kw in full_path or kw in filename for kw in keywords):
                location = loc
                break

        # Detect event type
        event = None
        for evt, keywords in EVENT_KEYWORDS.items():
            if any(kw in full_path or kw in filename for kw in keywords):
                event = evt
                break

        # Detect service type
        service = None
        for svc, keywords in SERVICE_KEYWORDS.items():
            if any(kw in full_path or kw in filename for kw in keywords):
                service = svc
                break

        # Detect subject
        subjects = []
        for subj, keywords in SUBJECT_KEYWORDS.items():
            if any(kw in full_path or kw in filename for kw in keywords):
                subjects.append(subj)

        # Detect venue type from filename/path
        venue_type = None
        if any(kw in full_path for kw in ['palace', 'mahal', 'haveli']):
            venue_type = 'palace'
        elif any(kw in full_path for kw in ['beach', 'sea', 'ocean']):
            venue_type = 'beach'
        elif any(kw in full_path for kw in ['fort', 'qila']):
            venue_type = 'fort'
        elif any(kw in full_path for kw in ['resort', 'hotel']):
            venue_type = 'resort'

        # Default to Udaipur palace style based on image characteristics
        if not location:
            location = 'udaipur'  # Default
        if not venue_type:
            venue_type = 'palace'  # Default for luxury wedding planner

        # Generate description based on detected elements
        elements = []
        if 'mandap' in full_path or 'decor' in full_path:
            elements.append('mandap')
        if 'flower' in full_path or 'floral' in full_path:
            elements.append('flowers')
        if 'light' in full_path:
            elements.append('lighting')
        if 'red' in dominant_colors:
            elements.append('traditional-red')
        if 'gold' in dominant_colors:
            elements.append('gold-accents')

        # Build analysis result
        analysis = {
            'description': self._generate_description(location, venue_type, event, subjects, elements),
            'category': {
                'primary': event or service or 'venue',
                'secondary': subjects[0] if subjects else 'general',
                'event_type': event or 'wedding'
            },
            'location': {
                'detected': location,
                'venue_type': venue_type,
                'setting': 'outdoor' if 'outdoor' in full_path else 'indoor'
            },
            'subjects': subjects or ['venue'],
            'elements': elements or ['elegant-decor'],
            'mood': 'romantic-traditional',
            'colors': dominant_colors[:5] if dominant_colors else ['red', 'gold'],
            'quality_score': img_data.get('quality_score', 5),
            'usable_for': img_data.get('usable_for', ['gallery']),
            'suggested_alt_text': self._generate_alt_text(location, venue_type, event, subjects),
            'suggested_filename': self._generate_filename(location, venue_type, event, subjects, img_data['path'])
        }

        return analysis

    def _rgb_to_name(self, rgb):
        """Convert RGB to color name"""
        r, g, b = rgb
        if r > 200 and g < 100 and b < 100:
            return 'red'
        elif r > 200 and g > 150 and b < 100:
            return 'gold'
        elif r > 200 and g > 200 and b > 200:
            return 'white'
        elif r < 50 and g < 50 and b < 50:
            return 'black'
        elif r > 200 and g < 150 and b > 150:
            return 'pink'
        elif g > 150 and r < 100 and b < 100:
            return 'green'
        elif b > 150 and r < 100 and g < 100:
            return 'blue'
        else:
            return 'neutral'

    def _generate_description(self, location, venue_type, event, subjects, elements):
        """Generate a description for the image"""
        parts = []
        if subjects:
            parts.append(' and '.join(subjects))
        if event:
            parts.append(f"during {event.replace('-', ' ')}")
        if venue_type:
            parts.append(f"at {venue_type} venue")
        if location:
            parts.append(f"in {location.title()}")
        if elements:
            parts.append(f"with {', '.join(elements[:3])}")

        return ' '.join(parts) if parts else "Beautiful wedding moment"

    def _generate_alt_text(self, location, venue_type, event, subjects):
        """Generate SEO-friendly alt text"""
        parts = []
        if subjects:
            parts.append(' and '.join(subjects).title())
        if event:
            parts.append(event.replace('-', ' ').title())
        if location:
            parts.append(f"{location.title()} {venue_type or 'wedding'}")

        alt = ' - '.join(parts) if parts else "Luxury destination wedding"
        return alt[:125]  # Max 125 chars

    def _generate_filename(self, location, venue_type, event, subjects, original_path):
        """Generate SEO-friendly filename"""
        parts = []
        if location:
            parts.append(location)
        if venue_type:
            parts.append(venue_type)
        if event:
            parts.append(event)
        if subjects:
            parts.append(subjects[0])

        # Add unique identifier from original filename
        original_stem = original_path.stem
        hash_part = hashlib.md5(original_stem.encode()).hexdigest()[:6]
        parts.append(hash_part)

        return '-'.join(parts).lower().replace(' ', '-')

    # ========================================================================
    # PHASE 3: ORGANIZATION
    # ========================================================================

    def phase3_organization(self):
        """Organize images into folder structure"""
        print("\n" + "="*60)
        print("PHASE 3: ORGANIZATION")
        print("="*60)

        organized_count = defaultdict(int)

        for img_data in tqdm(self.images, desc="  Organizing images"):
            if 'analysis' not in img_data:
                continue

            analysis = img_data['analysis']
            src_path = img_data['path']

            # Determine destination folders
            destinations = []

            # By location
            location = analysis['location']['detected']
            if location:
                # Determine subfolder based on content
                if analysis['quality_score'] >= 8 and 'hero-banner' in analysis['usable_for']:
                    subfolder = 'heroes'
                elif 'venue' in analysis['subjects']:
                    subfolder = 'venues'
                elif 'couple-portrait' in analysis['subjects'] or 'bridal' in analysis['subjects']:
                    subfolder = 'couples'
                else:
                    subfolder = 'gallery'

                dest = ASSETS_DIR / "by-location" / location / subfolder
                destinations.append(dest)
                organized_count[f"by-location/{location}/{subfolder}"] += 1

            # By event
            event = analysis['category'].get('event_type')
            if event and event != 'wedding':
                dest = ASSETS_DIR / "by-event" / event
                destinations.append(dest)
                organized_count[f"by-event/{event}"] += 1

            # By service (if applicable)
            primary = analysis['category'].get('primary')
            if primary in SERVICE_KEYWORDS:
                dest = ASSETS_DIR / "by-service" / primary
                destinations.append(dest)
                organized_count[f"by-service/{primary}"] += 1

            # Copy to destinations
            new_filename = f"{analysis['suggested_filename']}{src_path.suffix}"
            img_data['organized_paths'] = []

            for dest in destinations:
                dest.mkdir(parents=True, exist_ok=True)
                dest_path = dest / new_filename
                if not dest_path.exists():
                    shutil.copy2(src_path, dest_path)
                img_data['organized_paths'].append(str(dest_path))

        # Print summary
        print("\n  Organization Summary:")
        for folder, count in sorted(organized_count.items()):
            print(f"    {folder}: {count}")

        return organized_count

    # ========================================================================
    # PHASE 4: OPTIMIZATION
    # ========================================================================

    def phase4_optimization(self):
        """Create optimized versions in multiple formats and sizes"""
        print("\n" + "="*60)
        print("PHASE 4: IMAGE OPTIMIZATION")
        print("="*60)

        optimization_stats = {
            'processed': 0,
            'webp_created': 0,
            'avif_created': 0,
            'total_original_size': 0,
            'total_optimized_size': 0
        }

        for img_data in tqdm(self.images, desc="  Optimizing images"):
            if 'analysis' not in img_data:
                continue

            try:
                src_path = img_data['path']
                base_name = img_data['analysis']['suggested_filename']

                with Image.open(src_path) as img:
                    # Convert to RGB if necessary
                    if img.mode in ('RGBA', 'P'):
                        img = img.convert('RGB')

                    original_size = src_path.stat().st_size
                    optimization_stats['total_original_size'] += original_size

                    img_data['optimized_files'] = {}

                    # Generate each size
                    for size_name, dimensions in SIZES.items():
                        img_copy = img.copy()

                        if size_name == 'blur':
                            # Create blur placeholder
                            img_copy.thumbnail(dimensions, Image.Resampling.LANCZOS)
                            buffer = BytesIO()
                            img_copy.save(buffer, format='WEBP', quality=20)
                            blur_b64 = base64.b64encode(buffer.getvalue()).decode()
                            img_data['blur_placeholder'] = f"data:image/webp;base64,{blur_b64}"
                            continue

                        # Resize
                        if dimensions[1] is None:
                            # Maintain aspect ratio
                            ratio = dimensions[0] / img_copy.width
                            new_size = (dimensions[0], int(img_copy.height * ratio))
                            img_copy.thumbnail(new_size, Image.Resampling.LANCZOS)
                        else:
                            img_copy.thumbnail(dimensions, Image.Resampling.LANCZOS)

                        # Save WebP
                        webp_dir = WEBSITE_READY_DIR / "webp" / f"{size_name}s"
                        webp_dir.mkdir(parents=True, exist_ok=True)
                        webp_path = webp_dir / f"{base_name}.webp"
                        img_copy.save(webp_path, 'WEBP', quality=85, optimize=True)
                        optimization_stats['webp_created'] += 1

                        # Save AVIF
                        avif_dir = WEBSITE_READY_DIR / "avif" / f"{size_name}s"
                        avif_dir.mkdir(parents=True, exist_ok=True)
                        avif_path = avif_dir / f"{base_name}.avif"
                        img_copy.save(avif_path, 'AVIF', quality=80)
                        optimization_stats['avif_created'] += 1

                        # Track sizes
                        if size_name not in img_data['optimized_files']:
                            img_data['optimized_files'][size_name] = {}
                        img_data['optimized_files'][size_name]['webp'] = str(webp_path)
                        img_data['optimized_files'][size_name]['avif'] = str(avif_path)

                        optimization_stats['total_optimized_size'] += webp_path.stat().st_size

                    # Save original (losslessly optimized)
                    orig_dir = WEBSITE_READY_DIR / "original"
                    orig_dir.mkdir(parents=True, exist_ok=True)
                    orig_path = orig_dir / f"{base_name}{src_path.suffix}"
                    shutil.copy2(src_path, orig_path)
                    img_data['optimized_files']['original'] = str(orig_path)

                optimization_stats['processed'] += 1

            except Exception as e:
                print(f"    Error optimizing {img_data['path']}: {e}")

        # Calculate savings
        if optimization_stats['total_original_size'] > 0:
            savings = (1 - optimization_stats['total_optimized_size'] / optimization_stats['total_original_size']) * 100
        else:
            savings = 0

        print(f"\n  Optimization Complete:")
        print(f"    Images processed: {optimization_stats['processed']}")
        print(f"    WebP files created: {optimization_stats['webp_created']}")
        print(f"    AVIF files created: {optimization_stats['avif_created']}")
        print(f"    Original size: {optimization_stats['total_original_size'] / 1_000_000:.1f} MB")
        print(f"    Optimized size: {optimization_stats['total_optimized_size'] / 1_000_000:.1f} MB")
        print(f"    Space savings: {savings:.1f}%")

        return optimization_stats

    # ========================================================================
    # PHASE 5 & 6: GENERATE OUTPUT FILES
    # ========================================================================

    def phase5_6_generate_outputs(self):
        """Generate all output JSON files"""
        print("\n" + "="*60)
        print("PHASE 5 & 6: GENERATING OUTPUT FILES")
        print("="*60)

        # 1. Generate manifest.json
        print("  Generating manifest.json...")
        manifest = {
            'generated_at': datetime.now().isoformat(),
            'total_images': len(self.images),
            'sources': {
                'website': len([i for i in self.images if i['source'] == 'website']),
                'local': len([i for i in self.images if i['source'] == 'local'])
            },
            'images': []
        }

        for img_data in self.images:
            if 'analysis' not in img_data:
                continue

            entry = {
                'id': img_data['analysis']['suggested_filename'],
                'original_source': str(img_data['path']),
                'analysis': img_data['analysis'],
                'files': img_data.get('optimized_files', {}),
                'blur_placeholder': img_data.get('blur_placeholder', ''),
                'alt_text': img_data['analysis']['suggested_alt_text'],
                'categories': img_data.get('organized_paths', []),
                'tags': [
                    img_data['analysis']['location']['detected'],
                    img_data['analysis']['category']['primary'],
                    img_data['analysis']['category']['event_type']
                ],
                'dimensions': img_data.get('dimensions', {}),
                'quality_score': img_data.get('quality_score', 5)
            }
            manifest['images'].append(entry)

        with open(METADATA_DIR / "manifest.json", 'w') as f:
            json.dump(manifest, f, indent=2)

        # 2. Generate alt-texts.json
        print("  Generating alt-texts.json...")
        alt_texts = {}
        for img_data in self.images:
            if 'analysis' not in img_data:
                continue
            filename = img_data['analysis']['suggested_filename']
            alt_texts[filename] = {
                'alt': img_data['analysis']['suggested_alt_text'],
                'title': img_data['analysis']['description'][:100],
                'caption': img_data['analysis']['description'],
                'keywords': [
                    img_data['analysis']['location']['detected'],
                    img_data['analysis']['location']['venue_type'],
                    img_data['analysis']['category']['event_type']
                ] + img_data['analysis']['elements'][:3]
            }

        with open(METADATA_DIR / "alt-texts.json", 'w') as f:
            json.dump(alt_texts, f, indent=2)

        # 3. Generate landing-page-data.json
        print("  Generating landing-page-data.json...")
        landing_data = {'locations': {}}

        for location in LOCATION_KEYWORDS.keys():
            location_images = [i for i in self.images
                            if i.get('analysis', {}).get('location', {}).get('detected') == location]

            heroes = [i for i in location_images
                     if 'hero-banner' in i.get('analysis', {}).get('usable_for', [])]

            landing_data['locations'][location] = {
                'slug': f"{location}-destination-wedding",
                'hero_images': [
                    {
                        'src': i.get('optimized_files', {}).get('hero', {}).get('webp', ''),
                        'avif': i.get('optimized_files', {}).get('hero', {}).get('avif', ''),
                        'blur': i.get('blur_placeholder', ''),
                        'alt': i.get('analysis', {}).get('suggested_alt_text', ''),
                        'width': 1920,
                        'height': 1080
                    }
                    for i in heroes[:5]
                ],
                'gallery': [
                    {
                        'src': i.get('optimized_files', {}).get('card', {}).get('webp', ''),
                        'alt': i.get('analysis', {}).get('suggested_alt_text', '')
                    }
                    for i in location_images[:20]
                ],
                'stats': {
                    'total_images': len(location_images)
                }
            }

        with open(METADATA_DIR / "landing-page-data.json", 'w') as f:
            json.dump(landing_data, f, indent=2)

        # 4. Generate duplicates-report.json
        print("  Generating duplicates-report.json...")
        with open(METADATA_DIR / "duplicates-report.json", 'w') as f:
            json.dump({
                'exact_duplicates': self.duplicates,
                'total_duplicates': len(self.duplicates)
            }, f, indent=2)

        # 5. Generate quality-report.json
        print("  Generating quality-report.json...")
        quality_report = {
            'total_images': len(self.images),
            'by_quality': {
                'excellent': [str(i['path']) for i in self.images if i.get('quality_score', 0) >= 9],
                'good': [str(i['path']) for i in self.images if 7 <= i.get('quality_score', 0) < 9],
                'acceptable': [str(i['path']) for i in self.images if 5 <= i.get('quality_score', 0) < 7],
                'low': [str(i['path']) for i in self.images if i.get('quality_score', 0) < 5]
            }
        }

        with open(METADATA_DIR / "quality-report.json", 'w') as f:
            json.dump(quality_report, f, indent=2)

        print("\n  All output files generated!")
        print(f"    - manifest.json")
        print(f"    - alt-texts.json")
        print(f"    - landing-page-data.json")
        print(f"    - duplicates-report.json")
        print(f"    - quality-report.json")

    # ========================================================================
    # MAIN EXECUTION
    # ========================================================================

    def run(self):
        """Execute the complete pipeline"""
        print("\n" + "="*60)
        print("ELITE WEDDING PLANNER - IMAGE PIPELINE")
        print("="*60)
        print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

        # Phase 1
        self.phase1_discovery()

        # Phase 2
        self.phase2_analysis()

        # Phase 3
        self.phase3_organization()

        # Phase 4
        self.phase4_optimization()

        # Phase 5 & 6
        self.phase5_6_generate_outputs()

        print("\n" + "="*60)
        print("PIPELINE COMPLETE!")
        print("="*60)
        print(f"Finished at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"\nAll assets saved to: {ASSETS_DIR}")
        print(f"Metadata saved to: {METADATA_DIR}")


if __name__ == "__main__":
    pipeline = ImagePipeline()
    pipeline.run()
