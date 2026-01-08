#!/usr/bin/env python3
"""
Elite Wedding Planner Image Scraper
Downloads, analyzes, and organizes images from eliteweddingplanner.in
"""

import os
import re
import json
import hashlib
import urllib.parse
from collections import defaultdict
from datetime import datetime
from pathlib import Path

import requests
from bs4 import BeautifulSoup
from PIL import Image
from io import BytesIO

# Configuration
BASE_URL = "https://eliteweddingplanner.in"
OUTPUT_DIR = Path("/Users/ruchitapathak/Documents/wedding-webapp/wedding-webapp/wedding-planner/photo2/eliteweddingplanner-assets")
RAW_DIR = OUTPUT_DIR / "raw-downloads"

# Location keywords for categorization
LOCATIONS = {
    'udaipur': ['udaipur', 'lake pichola', 'city palace udaipur', 'oberoi udaivilas', 'leela palace udaipur', 'jagmandir', 'fateh prakash'],
    'jaipur': ['jaipur', 'amer fort', 'city palace jaipur', 'rambagh', 'jai mahal', 'samode', 'fairmont jaipur'],
    'goa': ['goa', 'beach wedding', 'w goa', 'leela goa', 'taj exotica goa', 'panjim', 'candolim'],
    'kerala': ['kerala', 'backwaters', 'kumarakom', 'alleppey', 'munnar', 'kochi', 'kovalam'],
    'jim-corbett': ['jim corbett', 'corbett', 'forest wedding', 'jungle wedding', 'uttarakhand'],
    'mumbai': ['mumbai', 'taj lands end', 'four seasons mumbai', 'st regis mumbai', 'marine drive'],
    'delhi': ['delhi', 'leela palace delhi', 'oberoi delhi', 'taj palace delhi', 'lodhi', 'itc maurya']
}

# Event/ceremony keywords
CEREMONIES = {
    'mehendi': ['mehendi', 'mehndi', 'henna'],
    'sangeet': ['sangeet', 'sanget', 'dance', 'performance', 'stage'],
    'haldi': ['haldi', 'turmeric', 'yellow'],
    'wedding': ['wedding', 'phera', 'mandap', 'varmala', 'jaimala', 'ceremony', 'vows'],
    'reception': ['reception', 'party', 'dinner', 'cocktail']
}

# Service keywords
SERVICES = {
    'decor': ['decor', 'decoration', 'flowers', 'floral', 'mandap', 'stage setup', 'lighting'],
    'catering': ['catering', 'food', 'cuisine', 'buffet', 'dining', 'menu'],
    'entertainment': ['entertainment', 'dj', 'band', 'dancer', 'performance', 'fireworks'],
    'photography': ['photography', 'photographer', 'videography', 'drone', 'camera'],
    'makeup-styling': ['makeup', 'bridal makeup', 'styling', 'hair', 'beauty']
}

# Venue type keywords
VENUE_TYPES = {
    'palaces': ['palace', 'mahal', 'haveli', 'royal', 'heritage'],
    'resorts': ['resort', 'spa', 'retreat', 'luxury hotel'],
    'forts': ['fort', 'fortress', 'qila', 'garh'],
    'beaches': ['beach', 'seaside', 'ocean', 'coastal', 'waterfront'],
    'banquets': ['banquet', 'hall', 'ballroom', 'convention']
}

# Headers for requests
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
}

class WeddingImageScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update(HEADERS)
        self.visited_urls = set()
        self.images = []
        self.couples = defaultdict(list)
        self.location_data = defaultdict(lambda: {
            'hero_images': [],
            'venue_gallery': [],
            'real_weddings': [],
            'testimonials': []
        })

    def get_page(self, url):
        """Fetch a page with error handling"""
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            return response.text
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            return None

    def extract_all_links(self, soup, base_url):
        """Extract all internal links from a page"""
        links = set()
        for a in soup.find_all('a', href=True):
            href = a['href']
            full_url = urllib.parse.urljoin(base_url, href)
            parsed = urllib.parse.urlparse(full_url)

            # Only include internal links
            if 'eliteweddingplanner.in' in parsed.netloc:
                # Remove fragments and normalize
                clean_url = f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
                if not clean_url.endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf', '.mp4')):
                    links.add(clean_url)
        return links

    def extract_images(self, soup, page_url):
        """Extract all image URLs from a page"""
        images = []

        # Find all img tags
        for img in soup.find_all('img'):
            src = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
            if src:
                full_url = urllib.parse.urljoin(page_url, src)
                if any(ext in full_url.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp', '.gif']):
                    alt = img.get('alt', '')
                    images.append({
                        'url': full_url,
                        'alt': alt,
                        'source_page': page_url
                    })

        # Find background images in style attributes
        for elem in soup.find_all(style=True):
            style = elem['style']
            urls = re.findall(r'url\(["\']?([^"\')\s]+)["\']?\)', style)
            for url in urls:
                if any(ext in url.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp', '.gif']):
                    full_url = urllib.parse.urljoin(page_url, url)
                    images.append({
                        'url': full_url,
                        'alt': '',
                        'source_page': page_url
                    })

        # Find srcset images
        for img in soup.find_all(['img', 'source']):
            srcset = img.get('srcset')
            if srcset:
                for item in srcset.split(','):
                    url = item.strip().split()[0]
                    if any(ext in url.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp', '.gif']):
                        full_url = urllib.parse.urljoin(page_url, url)
                        images.append({
                            'url': full_url,
                            'alt': img.get('alt', ''),
                            'source_page': page_url
                        })

        return images

    def download_image(self, url, save_path):
        """Download an image and return its dimensions"""
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()

            # Get image dimensions
            img = Image.open(BytesIO(response.content))
            width, height = img.size

            # Save the image
            with open(save_path, 'wb') as f:
                f.write(response.content)

            return width, height, img.format
        except Exception as e:
            print(f"Error downloading {url}: {e}")
            return None, None, None

    def categorize_image(self, img_data, filename):
        """Categorize an image based on URL, alt text, and source page"""
        url_lower = img_data['url'].lower()
        alt_lower = img_data['alt'].lower()
        page_lower = img_data['source_page'].lower()
        combined = f"{url_lower} {alt_lower} {page_lower}"

        category = "raw-downloads"
        tags = []
        location = None
        ceremony = None
        service = None
        venue_type = None
        couple = None
        suggested_use = ""

        # Detect location
        for loc, keywords in LOCATIONS.items():
            if any(kw in combined for kw in keywords):
                location = loc
                tags.append(loc)
                break

        # Detect ceremony type
        for cer, keywords in CEREMONIES.items():
            if any(kw in combined for kw in keywords):
                ceremony = cer
                tags.append(cer)
                break

        # Detect service type
        for svc, keywords in SERVICES.items():
            if any(kw in combined for kw in keywords):
                service = svc
                tags.append(svc)
                break

        # Detect venue type
        for vt, keywords in VENUE_TYPES.items():
            if any(kw in combined for kw in keywords):
                venue_type = vt
                tags.append(vt)
                break

        # Check for testimonials
        if any(kw in combined for kw in ['testimonial', 'review', 'couple photo', 'happy couple']):
            category = "testimonials/couple-photos"
            suggested_use = "Testimonial section"
            tags.append('testimonial')

        # Check for hero/banner images (usually large, prominent)
        elif any(kw in combined for kw in ['hero', 'banner', 'slider', 'main', 'featured']):
            if location:
                category = f"landing-pages/{location}/hero-banners"
                suggested_use = f"{location.title()} landing page hero section"
            else:
                category = "landing-pages/udaipur/hero-banners"  # Default
                suggested_use = "Homepage or landing page hero"
            tags.append('hero')

        # Check for gallery images
        elif 'gallery' in combined:
            if location:
                category = f"landing-pages/{location}/gallery"
                suggested_use = f"{location.title()} gallery section"
            else:
                category = "landing-pages/udaipur/gallery"
            tags.append('gallery')

        # Categorize by service
        elif service:
            category = f"services/{service}"
            suggested_use = f"Service showcase - {service}"

        # Categorize by venue type
        elif venue_type:
            category = f"venues/{venue_type}"
            suggested_use = f"Venue showcase - {venue_type}"

        # Categorize by location (default)
        elif location:
            category = f"landing-pages/{location}/venues"
            suggested_use = f"{location.title()} venue gallery"

        # Try to extract couple name
        couple_match = re.search(r'([A-Z][a-z]+)\s*[&+]\s*([A-Z][a-z]+)', img_data['alt'])
        if couple_match:
            couple = f"{couple_match.group(1)} & {couple_match.group(2)}"
            tags.append('couple')

        return {
            'category': category,
            'tags': list(set(tags)),
            'suggested_use': suggested_use,
            'location': location,
            'ceremony': ceremony,
            'couple': couple
        }

    def create_resized_versions(self, img_path, filename):
        """Create hero, card, and thumbnail versions"""
        sizes = {
            'hero': (1920, 1080),
            'card': (800, 600),
            'thumbnail': (400, 300)
        }

        created = {}
        try:
            img = Image.open(img_path)

            for size_name, dimensions in sizes.items():
                output_dir = OUTPUT_DIR / "resized" / size_name
                output_path = output_dir / filename

                # Resize maintaining aspect ratio
                img_copy = img.copy()
                img_copy.thumbnail(dimensions, Image.Resampling.LANCZOS)

                # Convert to RGB if necessary
                if img_copy.mode in ('RGBA', 'P'):
                    img_copy = img_copy.convert('RGB')

                # Save with optimization
                img_copy.save(output_path, 'JPEG', quality=85, optimize=True)
                created[size_name] = str(output_path)
        except Exception as e:
            print(f"Error creating resized versions for {filename}: {e}")

        return created

    def crawl_site(self, max_pages=100):
        """Crawl the entire site and collect image URLs"""
        print(f"Starting crawl of {BASE_URL}")

        # Initial pages to crawl
        urls_to_visit = {
            BASE_URL,
            f"{BASE_URL}/",
            f"{BASE_URL}/destination-weddings/",
            f"{BASE_URL}/gallery/",
            f"{BASE_URL}/testimonials/",
            f"{BASE_URL}/real-weddings/",
            f"{BASE_URL}/services/",
            f"{BASE_URL}/contact/",
            f"{BASE_URL}/about/",
        }

        # Add location-specific pages
        for loc in LOCATIONS.keys():
            urls_to_visit.add(f"{BASE_URL}/{loc.replace('-', '')}-wedding/")
            urls_to_visit.add(f"{BASE_URL}/destination-wedding-{loc.replace('-', '')}/")
            urls_to_visit.add(f"{BASE_URL}/{loc.replace('-', '')}/")

        all_images = []
        pages_crawled = 0

        while urls_to_visit and pages_crawled < max_pages:
            url = urls_to_visit.pop()

            if url in self.visited_urls:
                continue

            print(f"Crawling: {url}")
            self.visited_urls.add(url)
            pages_crawled += 1

            html = self.get_page(url)
            if not html:
                continue

            soup = BeautifulSoup(html, 'html.parser')

            # Extract images
            images = self.extract_images(soup, url)
            all_images.extend(images)
            print(f"  Found {len(images)} images")

            # Extract more links to crawl
            new_links = self.extract_all_links(soup, url)
            urls_to_visit.update(new_links - self.visited_urls)

        # Deduplicate images by URL
        seen_urls = set()
        unique_images = []
        for img in all_images:
            if img['url'] not in seen_urls:
                seen_urls.add(img['url'])
                unique_images.append(img)

        print(f"\nTotal pages crawled: {pages_crawled}")
        print(f"Total unique images found: {len(unique_images)}")

        return unique_images

    def process_images(self, images):
        """Download and categorize all images"""
        manifest = []

        for i, img_data in enumerate(images):
            url = img_data['url']
            print(f"Processing {i+1}/{len(images)}: {url[:80]}...")

            # Generate filename
            url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
            ext = Path(urllib.parse.urlparse(url).path).suffix or '.jpg'
            if ext not in ['.jpg', '.jpeg', '.png', '.webp', '.gif']:
                ext = '.jpg'
            filename = f"img_{url_hash}{ext}"

            # Download to raw folder first
            raw_path = RAW_DIR / filename
            width, height, fmt = self.download_image(url, raw_path)

            if width is None:
                continue

            # Categorize
            cat_info = self.categorize_image(img_data, filename)

            # Copy to categorized folder (skip if same as raw)
            cat_dir = OUTPUT_DIR / cat_info['category']
            cat_dir.mkdir(parents=True, exist_ok=True)
            cat_path = cat_dir / filename

            # Copy file only if different from raw path
            import shutil
            if cat_path.resolve() != raw_path.resolve():
                shutil.copy2(raw_path, cat_path)

            # Create resized versions
            resized = self.create_resized_versions(raw_path, filename.replace(ext, '.jpg'))

            # Build manifest entry
            entry = {
                'filename': filename,
                'original_url': url,
                'source_page': img_data['source_page'],
                'alt_text': img_data['alt'],
                'category': cat_info['category'],
                'tags': cat_info['tags'],
                'suggested_use': cat_info['suggested_use'],
                'dimensions': f"{width}x{height}",
                'location': cat_info['location'],
                'ceremony': cat_info['ceremony'],
                'couple': cat_info['couple'],
                'resized': resized
            }
            manifest.append(entry)

            # Update location data
            if cat_info['location']:
                loc = cat_info['location']
                if 'hero' in cat_info['category']:
                    self.location_data[loc]['hero_images'].append(str(cat_path))
                elif 'venue' in cat_info['category'] or 'gallery' in cat_info['category']:
                    self.location_data[loc]['venue_gallery'].append(str(cat_path))

                if cat_info['couple']:
                    wedding = {
                        'couple': cat_info['couple'],
                        'year': datetime.now().year,
                        'cover_image': str(cat_path),
                        'gallery': [str(cat_path)]
                    }
                    self.location_data[loc]['real_weddings'].append(wedding)

        return manifest

    def generate_reports(self, manifest):
        """Generate manifest.json, location-landing-pages.json, and summary report"""

        # Save manifest.json
        manifest_path = OUTPUT_DIR / "manifest.json"
        with open(manifest_path, 'w') as f:
            json.dump({'images': manifest, 'generated_at': datetime.now().isoformat()}, f, indent=2)
        print(f"\nSaved manifest.json with {len(manifest)} images")

        # Save location-landing-pages.json
        location_path = OUTPUT_DIR / "location-landing-pages.json"
        with open(location_path, 'w') as f:
            json.dump(dict(self.location_data), f, indent=2)
        print(f"Saved location-landing-pages.json")

        # Generate summary report
        summary = {
            'total_images': len(manifest),
            'by_location': defaultdict(int),
            'by_category': defaultdict(int),
            'by_ceremony': defaultdict(int),
            'couples_found': [],
            'missing_locations': [],
            'recommendations': []
        }

        for entry in manifest:
            if entry['location']:
                summary['by_location'][entry['location']] += 1
            summary['by_category'][entry['category'].split('/')[0]] += 1
            if entry['ceremony']:
                summary['by_ceremony'][entry['ceremony']] += 1
            if entry['couple'] and entry['couple'] not in summary['couples_found']:
                summary['couples_found'].append(entry['couple'])

        # Check for missing locations
        for loc in LOCATIONS.keys():
            if summary['by_location'].get(loc, 0) < 5:
                summary['missing_locations'].append(loc)
                summary['recommendations'].append(f"Need more images for {loc} (only {summary['by_location'].get(loc, 0)} found)")

        # Save summary
        summary_path = OUTPUT_DIR / "summary-report.json"
        with open(summary_path, 'w') as f:
            json.dump(summary, f, indent=2, default=list)

        # Print summary
        print("\n" + "="*50)
        print("SUMMARY REPORT")
        print("="*50)
        print(f"\nTotal Images: {summary['total_images']}")
        print(f"\nBy Location:")
        for loc, count in sorted(summary['by_location'].items()):
            print(f"  {loc}: {count}")
        print(f"\nBy Category:")
        for cat, count in sorted(summary['by_category'].items()):
            print(f"  {cat}: {count}")
        print(f"\nCouples Found: {len(summary['couples_found'])}")
        print(f"\nRecommendations:")
        for rec in summary['recommendations']:
            print(f"  - {rec}")

        return summary

    def run(self):
        """Main execution"""
        print("="*50)
        print("Elite Wedding Planner Image Scraper")
        print("="*50)

        # Crawl and collect images
        images = self.crawl_site(max_pages=50)

        if not images:
            print("No images found!")
            return

        # Process and categorize images
        manifest = self.process_images(images)

        # Generate reports
        self.generate_reports(manifest)

        print("\n" + "="*50)
        print("COMPLETE!")
        print(f"All assets saved to: {OUTPUT_DIR}")
        print("="*50)


if __name__ == "__main__":
    scraper = WeddingImageScraper()
    scraper.run()
