// Server-side blog utilities - uses Node.js fs
import fs from 'fs';
import path from 'path';
import { BlogPost, getDefaultImageForCategory, formatDate } from './blog-utils';

// Re-export for convenience
export type { BlogPost };
export { formatDate };

// Get all blog posts from JSON files
export function getAllBlogPosts(): BlogPost[] {
  const blogPostsDirectory = path.join(process.cwd(), 'src/data/blog-posts');

  // Check if directory exists
  if (!fs.existsSync(blogPostsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogPostsDirectory);
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .map(fileName => {
      const fullPath = path.join(blogPostsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const post: BlogPost = JSON.parse(fileContents);

      // Add default image based on category if not provided
      if (!post.image) {
        post.image = getDefaultImageForCategory(post.category);
      }

      return post;
    });

  // Sort posts by publish date (newest first)
  return allPosts.sort((a, b) => {
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });
}

// Get a single blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const allPosts = getAllBlogPosts();
  return allPosts.find(post => post.slug === slug) || null;
}

// Get blog posts by category
export function getBlogPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllBlogPosts();
  if (category === 'All Posts') {
    return allPosts;
  }
  return allPosts.filter(post => post.category === category);
}

// Get all unique categories
export function getAllCategories(): string[] {
  const allPosts = getAllBlogPosts();
  const categories = new Set<string>();
  allPosts.forEach(post => categories.add(post.category));
  return ['All Posts', ...Array.from(categories).sort()];
}

// Get featured post (most recent)
export function getFeaturedPost(): BlogPost | null {
  const allPosts = getAllBlogPosts();
  return allPosts[0] || null;
}

// Get related posts by category (excluding current post)
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(currentSlug);
  if (!currentPost) return [];

  const relatedPosts = getAllBlogPosts()
    .filter(post => post.slug !== currentSlug && post.category === currentPost.category);

  return relatedPosts.slice(0, limit);
}
