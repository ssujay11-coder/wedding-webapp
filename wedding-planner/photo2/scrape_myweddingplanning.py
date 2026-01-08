#!/usr/bin/env python3
"""
MyWeddingPlanning.in Image Scraper
Downloads, analyzes, and organizes images from myweddingplanning.in
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
BASE_URL = "https://myweddingplanning.in"
OUTPUT_DIR = Path("/Users/ruchitapathak/Documents/wedding-webapp/wedding-webapp/wedding-planner/photo2/myweddingplanning-assets")
RAW_DIR = OUTPUT_DIR / "raw-downloads"

# Create directories
RAW_DIR.mkdir(parents=True, exist_ok=True)
for subdir in ["landing-pages", "testimonials", "services", "venues", "resized/hero", "resized/card", "resized/thumbnail"]:
    (OUTPUT_DIR / subdir).mkdir(parents=True, exist_ok=True)

# Headers for requests
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
}

class MyWeddingPlanningScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update(HEADERS)
        self.visited_urls = set()
        self.images = []

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

            if 'myweddingplanning.in' in parsed.netloc:
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

        # Find background images
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

            img = Image.open(BytesIO(response.content))
            width, height = img.size

            with open(save_path, 'wb') as f:
                f.write(response.content)

            return width, height, img.format
        except Exception as e:
            print(f"Error downloading {url}: {e}")
            return None, None, None

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

                img_copy = img.copy()
                img_copy.thumbnail(dimensions, Image.Resampling.LANCZOS)

                if img_copy.mode in ('RGBA', 'P'):
                    img_copy = img_copy.convert('RGB')

                img_copy.save(output_path, 'JPEG', quality=85, optimize=True)
                created[size_name] = str(output_path)
        except Exception as e:
            print(f"Error creating resized versions for {filename}: {e}")

        return created

    def crawl_site(self, max_pages=50):
        """Crawl the entire site and collect image URLs"""
        print(f"Starting crawl of {BASE_URL}")

        urls_to_visit = {
            BASE_URL,
            f"{BASE_URL}/",
            f"{BASE_URL}/gallery/",
            f"{BASE_URL}/services/",
            f"{BASE_URL}/about/",
            f"{BASE_URL}/contact/",
            f"{BASE_URL}/portfolio/",
            f"{BASE_URL}/weddings/",
            f"{BASE_URL}/destination-weddings/",
        }

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

            images = self.extract_images(soup, url)
            all_images.extend(images)
            print(f"  Found {len(images)} images")

            new_links = self.extract_all_links(soup, url)
            urls_to_visit.update(new_links - self.visited_urls)

        # Deduplicate
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
            filename = f"mwp_{url_hash}{ext}"

            # Download
            raw_path = RAW_DIR / filename
            width, height, fmt = self.download_image(url, raw_path)

            if width is None:
                continue

            # Create resized versions
            resized = self.create_resized_versions(raw_path, filename.replace(ext, '.jpg'))

            # Build manifest entry
            entry = {
                'filename': filename,
                'original_url': url,
                'source_page': img_data['source_page'],
                'alt_text': img_data['alt'],
                'category': 'raw-downloads',
                'tags': ['wedding'],
                'suggested_use': 'Gallery or landing page',
                'dimensions': f"{width}x{height}",
                'resized': resized
            }
            manifest.append(entry)

        return manifest

    def generate_reports(self, manifest):
        """Generate manifest.json and summary"""

        manifest_path = OUTPUT_DIR / "manifest.json"
        with open(manifest_path, 'w') as f:
            json.dump({'images': manifest, 'generated_at': datetime.now().isoformat(), 'source': 'myweddingplanning.in'}, f, indent=2)
        print(f"\nSaved manifest.json with {len(manifest)} images")

        summary = {
            'total_images': len(manifest),
            'source': 'myweddingplanning.in',
            'generated_at': datetime.now().isoformat()
        }

        summary_path = OUTPUT_DIR / "summary-report.json"
        with open(summary_path, 'w') as f:
            json.dump(summary, f, indent=2)

        print("\n" + "="*50)
        print("SUMMARY REPORT")
        print("="*50)
        print(f"Total Images: {summary['total_images']}")

        return summary

    def run(self):
        """Main execution"""
        print("="*50)
        print("MyWeddingPlanning.in Image Scraper")
        print("="*50)

        images = self.crawl_site(max_pages=50)

        if not images:
            print("No images found!")
            return

        manifest = self.process_images(images)
        self.generate_reports(manifest)

        print("\n" + "="*50)
        print("COMPLETE!")
        print(f"All assets saved to: {OUTPUT_DIR}")
        print("="*50)


if __name__ == "__main__":
    scraper = MyWeddingPlanningScraper()
    scraper.run()
