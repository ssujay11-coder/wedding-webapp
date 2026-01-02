"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Tag, Share2, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPost, formatDate } from "@/lib/blog-utils";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface BlogPostContentProps {
  post: BlogPost & { featuredImage?: string; faqs?: Array<{ question: string; answer: string }> };
  relatedPosts: BlogPost[];
}

export function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const imageUrl = post.featuredImage || post.image || "https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/elite-wedding-planner.webp";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover brightness-75"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 -mt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="inline-flex items-center gap-1 text-primary font-semibold">
              <Tag className="w-4 h-4" />
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishDate)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-display italic mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-4 pb-8 mb-8 border-b border-border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="font-semibold">{post.author}</div>
              <div className="text-sm text-muted-foreground">Elite Wedding Planning Team</div>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:italic prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* FAQ Section */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border">
              <h2 className="text-3xl font-display italic mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {post.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-primary/10 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-primary/5 transition-colors"
                    >
                      <span className="font-semibold text-lg text-foreground pr-4">
                        {faq.question}
                      </span>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                      )}
                    </button>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-5"
                      >
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl">
            <h3 className="text-2xl font-display italic mb-4">Ready to Start Planning?</h3>
            <p className="text-muted-foreground mb-6">
              Let Elite Wedding Planner bring your destination wedding vision to life. With 200+
              weddings and 14 years of experience across India's most beautiful destinations,
              we'll ensure every detail is perfect.
            </p>
            <Link href="/contact">
              <Button className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6">
                Plan Your Wedding
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-muted-foreground">Share this article:</span>
              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-accent transition-colors"
              >
                <Share2 className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </button>
            </div>
          </div>
        </motion.div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-display italic mb-12 text-center">
              Related Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="group cursor-pointer">
                      <div className="relative h-64 overflow-hidden rounded-2xl mb-4">
                        <Image
                          src={relatedPost.image || "https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/elite-wedding-planner.webp"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <span className="text-sm text-primary font-semibold mb-2 block">
                        {relatedPost.category}
                      </span>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
