import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPostBySlug, getRelatedPosts } from "@/lib/blog";
import { BlogPostContent } from "./blog-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Elite Wedding Planner Blog",
    };
  }

  const imageUrl = post.featuredImage || post.image || "https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/elite-wedding-planner.webp";

  return {
    title: `${post.title} | Elite Wedding Planner Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      url: `https://eliteweddingplanner.in/blog/${slug}`,
      siteName: "Elite Wedding Planner",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);
  const imageUrl = post.featuredImage || post.image || "https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/elite-wedding-planner.webp";

  // Article Schema (Schema.org)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://eliteweddingplanner.in/blog/${slug}#article`,
    "headline": post.title,
    "description": post.excerpt,
    "image": imageUrl,
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://eliteweddingplanner.in/about"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://eliteweddingplanner.in/#organization",
      "name": "Elite Wedding Planner",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/EWP-LOGO-WEBP.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://eliteweddingplanner.in/blog/${slug}`
    },
    "articleSection": post.category,
    "keywords": post.keywords?.join(", ") || "",
    "wordCount": post.content?.split(/\s+/).length || 1500,
    "inLanguage": "en-IN"
  };

  // FAQ Schema (if post has FAQs)
  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map((faq: { question: string; answer: string }) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://eliteweddingplanner.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://eliteweddingplanner.in/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://eliteweddingplanner.in/blog/${slug}`
      }
    ]
  };

  const structuredData: object[] = [articleSchema, breadcrumbSchema];
  if (faqSchema) {
    structuredData.push(faqSchema);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogPostContent post={post} relatedPosts={relatedPosts} />
    </>
  );
}
