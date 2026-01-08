#!/usr/bin/env python3
"""
Image Categorization Script
Analyzes images and categorizes them into proper folders
Based on visual analysis of the downloaded images
"""

import os
import json
import shutil
from pathlib import Path
from PIL import Image

BASE_DIR = Path("/Users/ruchitapathak/Documents/wedding-webapp/wedding-webapp/wedding-planner/photo2/eliteweddingplanner-assets")
RAW_DIR = BASE_DIR / "raw-downloads"

# Manual categorization based on visual analysis and filename patterns
CATEGORIZATION = {
    # Team photos
    "team": {
        "folder": "testimonials/couple-photos",
        "patterns": ["team-elite", "team-elitewedding"],
        "tags": ["team", "staff", "company"],
        "suggested_use": "About us page, team section"
    },

    # Logo images
    "logo": {
        "folder": "landing-pages/udaipur/thumbnails",
        "patterns": ["logo", "premade_logo"],
        "tags": ["logo", "branding"],
        "suggested_use": "Header, footer, branding"
    },

    # Venue/Decor images - Palace style (Umaid Bhawan style)
    "venue_palace": {
        "folder": "venues/palaces",
        "patterns": ["Wedding-by-Elite", "Weddings-By-Elite"],
        "tags": ["venue", "palace", "decor", "ceremony"],
        "suggested_use": "Venue showcase, hero images, gallery"
    },

    # Testimonials
    "testimonial": {
        "folder": "testimonials/couple-photos",
        "patterns": ["testimonail", "Testimonail", "Wedding-Testimonail", "Wedding-Tesimonail"],
        "tags": ["testimonial", "review", "couple"],
        "suggested_use": "Testimonials section"
    },

    # Stock/Generic images
    "stock": {
        "folder": "services/photography",
        "patterns": ["fashion-portrait", "cropped-shot", "happy-couple", "wedding-beautiful"],
        "tags": ["stock", "generic"],
        "suggested_use": "Generic service pages, placeholders"
    },

    # Staff portraits
    "staff": {
        "folder": "testimonials/couple-photos",
        "patterns": ["sujay", "ruchita", "aloha"],
        "tags": ["staff", "team", "portrait"],
        "suggested_use": "About us page, team profiles"
    }
}

def get_category(filename, url=""):
    """Determine category based on filename patterns"""
    filename_lower = filename.lower()
    url_lower = url.lower()
    combined = f"{filename_lower} {url_lower}"

    for category, info in CATEGORIZATION.items():
        for pattern in info["patterns"]:
            if pattern.lower() in combined:
                return category, info

    # Default to venues/palaces for wedding images
    return "venue_palace", CATEGORIZATION["venue_palace"]

def categorize_all_images():
    """Categorize all images and update manifest"""

    # Load existing manifest
    manifest_path = BASE_DIR / "manifest.json"
    with open(manifest_path, 'r') as f:
        manifest_data = json.load(f)

    updated_images = []
    location_data = {
        "udaipur": {"hero_images": [], "venue_gallery": [], "real_weddings": [], "testimonials": []},
        "jaipur": {"hero_images": [], "venue_gallery": [], "real_weddings": [], "testimonials": []},
        "goa": {"hero_images": [], "venue_gallery": [], "real_weddings": [], "testimonials": []},
        "kerala": {"hero_images": [], "venue_gallery": [], "real_weddings": [], "testimonials": []},
        "jim-corbett": {"hero_images": [], "venue_gallery": [], "real_weddings": [], "testimonials": []},
        "mumbai": {"hero_images": [], "venue_gallery": [], "real_weddings": [], "testimonials": []},
        "delhi": {"hero_images": [], "venue_gallery": [], "real_weddings": [], "testimonials": []}
    }

    category_counts = {}

    for img in manifest_data["images"]:
        filename = img["filename"]
        url = img.get("original_url", "")

        # Get category
        cat_name, cat_info = get_category(filename, url)
        folder = cat_info["folder"]

        # Track counts
        category_counts[folder] = category_counts.get(folder, 0) + 1

        # Source and destination paths
        src_path = RAW_DIR / filename
        dest_dir = BASE_DIR / folder
        dest_path = dest_dir / filename

        # Copy file if not already there
        if src_path.exists() and not dest_path.exists():
            dest_dir.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src_path, dest_path)
            print(f"Copied {filename} -> {folder}")

        # Update manifest entry
        img["category"] = folder
        img["tags"] = list(set(img.get("tags", []) + cat_info["tags"]))
        img["suggested_use"] = cat_info["suggested_use"]

        # Determine location (default to udaipur for palace venues)
        if "palace" in folder or "venue" in folder:
            img["location"] = "udaipur"  # Most palace images are Rajasthan style
            location_data["udaipur"]["venue_gallery"].append(str(dest_path))
        elif "testimonial" in folder:
            img["location"] = None
            # Add to all locations' testimonials
            for loc in location_data:
                location_data[loc]["testimonials"].append({
                    "couple": img.get("alt_text", "Happy Couple"),
                    "photo": str(dest_path),
                    "quote": ""
                })

        # Add hero-worthy images
        if img.get("dimensions"):
            dims = img["dimensions"].split("x")
            if len(dims) == 2:
                w, h = int(dims[0]), int(dims[1])
                if w >= 1000 and "palace" in folder:
                    location_data["udaipur"]["hero_images"].append(str(dest_path))

        updated_images.append(img)

    # Save updated manifest
    manifest_data["images"] = updated_images
    with open(manifest_path, 'w') as f:
        json.dump(manifest_data, f, indent=2)
    print(f"\nUpdated manifest.json")

    # Save location landing pages JSON
    location_path = BASE_DIR / "location-landing-pages.json"
    with open(location_path, 'w') as f:
        json.dump(location_data, f, indent=2)
    print(f"Updated location-landing-pages.json")

    # Print summary
    print("\n" + "="*50)
    print("CATEGORIZATION COMPLETE")
    print("="*50)
    print("\nImages per category:")
    for folder, count in sorted(category_counts.items()):
        print(f"  {folder}: {count}")

    # Generate summary report
    summary = {
        "total_images": len(updated_images),
        "by_category": category_counts,
        "hero_images_count": len(location_data["udaipur"]["hero_images"]),
        "testimonials_count": sum(1 for img in updated_images if "testimonial" in img["category"]),
        "venue_images_count": sum(1 for img in updated_images if "venue" in img["category"] or "palace" in img["category"]),
        "team_images_count": sum(1 for img in updated_images if "team" in img.get("tags", [])),
    }

    summary_path = BASE_DIR / "summary-report.json"
    with open(summary_path, 'w') as f:
        json.dump(summary, f, indent=2)
    print(f"\nUpdated summary-report.json")

    return summary

if __name__ == "__main__":
    categorize_all_images()
