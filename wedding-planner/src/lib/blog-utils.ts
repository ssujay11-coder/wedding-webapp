// Client-safe blog utilities - no Node.js dependencies

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: string;
  keywords: string[];
  content: string;
  image?: string;
  featuredImage?: string;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

// Format date for display - client safe
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Helper function to get default image based on category
export function getDefaultImageForCategory(category: string): string {
  const imageMap: Record<string, string> = {
    'Budget & Planning': 'https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/elite-wedding-planner.webp',
    'Planning & Timeline': 'https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/udaipur-wedding-planner.webp',
    'Destination Weddings': 'https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/goa-wedding-planner.webp',
    'Trends & Inspiration': 'https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/jaipur-wedding-planner.webp',
    'Planning & Vendors': 'https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/jodhpur-wedding-planner.webp',
    'Design & Styling': 'https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/dubai-wedding.webp'
  };

  return imageMap[category] || 'https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/elite-wedding-planner.webp';
}
