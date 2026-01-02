"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Tag, Mail, BookOpen, Award, Users, TrendingUp, ChevronDown, Phone, MessageCircle, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPost, formatDate } from "@/lib/blog-utils";

// Blog Statistics
const blogStats = [
    { value: "100+", label: "Articles Published", subLabel: "Expert Insights" },
    { value: "14+", label: "Years Experience", subLabel: "Industry Knowledge" },
    { value: "5K+", label: "Newsletter Subscribers", subLabel: "Active Readers" },
    { value: "200+", label: "Weddings Documented", subLabel: "Real Stories" },
];

// Popular Topics
const popularTopics = [
    { topic: "Destination Guides", articles: 25, color: "bg-blue-100 text-blue-700" },
    { topic: "Budget Planning", articles: 18, color: "bg-green-100 text-green-700" },
    { topic: "Decor & Trends", articles: 22, color: "bg-purple-100 text-purple-700" },
    { topic: "Vendor Tips", articles: 15, color: "bg-orange-100 text-orange-700" },
];

// Blog FAQs
const blogFaqs = [
    {
        question: "How early should I start planning my destination wedding in India?",
        answer: "For destination weddings in India, we recommend starting 12-18 months in advance. Popular venues like Taj Lake Palace and Umaid Bhawan get booked 18-24 months ahead for peak wedding season (October-March). Starting early ensures venue availability and better vendor selection."
    },
    {
        question: "What is the average cost of a luxury wedding in India?",
        answer: "Luxury weddings in India typically range from ₹50 lakhs to ₹5+ crores. Beach weddings in Goa average ₹75 lakhs-1.5 crores, palace weddings in Rajasthan range from ₹1.5-3 crores, and international destination weddings can exceed ₹3-5 crores depending on location and guest count."
    },
    {
        question: "What are the best months for outdoor weddings in India?",
        answer: "The ideal months for outdoor weddings in India are October to March. Rajasthan and North India are best from November to February. Beach destinations like Goa are perfect from October to March. Hill stations offer pleasant weather from April to June and September to November."
    },
    {
        question: "How do I choose the right wedding planner?",
        answer: "Look for planners with 5+ years experience, strong vendor networks, portfolio of similar weddings, transparent pricing, and positive reviews. Interview 3-5 planners, check references, and ensure they understand your vision and budget."
    },
];

interface BlogClientProps {
  initialPosts: BlogPost[];
  categories: string[];
}

export function BlogClient({ initialPosts, categories }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [email, setEmail] = useState("");

  const filteredPosts = selectedCategory === "All Posts"
    ? initialPosts
    : initialPosts.filter(post => post.category === selectedCategory);

  const featuredPost = initialPosts[0];
  const regularPosts = filteredPosts.slice(selectedCategory === "All Posts" ? 1 : 0);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Newsletter signup:", email);
    alert("Thank you for subscribing! You'll receive our latest wedding planning tips.");
    setEmail("");
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 text-center bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full text-primary text-xs sm:text-sm font-semibold">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              100+ Articles
            </span>
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-secondary/10 rounded-full text-secondary text-xs sm:text-sm font-semibold">
              <Award className="w-3 h-3 sm:w-4 sm:h-4" />
              14 Years Expertise
            </span>
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-100 rounded-full text-green-700 text-xs sm:text-sm font-semibold">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              5K+ Subscribers
            </span>
          </div>

          {/* SEO H1 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display italic text-foreground mb-4 sm:mb-6">
            Wedding Planning Blog – <br className="hidden sm:block" />
            <span className="text-primary">Expert Tips & Guides</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-6 sm:mb-8 px-2">
            <strong>14 years of luxury wedding expertise</strong> distilled into actionable guides. From <strong>destination wedding planning</strong> in Udaipur to <strong>budget breakdowns</strong> for Goa beach weddings – get insider tips from planners who&apos;ve curated <strong>200+ celebrations</strong>.
          </p>

          {/* Quick Stats - Mobile 2x2 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-8">
            {blogStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-primary/10 shadow-sm"
              >
                <p className="font-display text-xl sm:text-2xl text-primary">{stat.value}</p>
                <p className="text-xs sm:text-sm text-foreground font-medium">{stat.label}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{stat.subLabel}</p>
              </motion.div>
            ))}
          </div>

          {/* Popular Topics */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {popularTopics.map((topic, i) => (
              <span key={i} className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium ${topic.color}`}>
                {topic.topic} ({topic.articles})
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full whitespace-nowrap font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-lg"
                    : "bg-accent text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {selectedCategory === "All Posts" && featuredPost && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <Link href={`/blog/${featuredPost.slug}`}>
                <div className="relative h-96 overflow-hidden rounded-3xl group cursor-pointer">
                  <Image
                    src={featuredPost.image || ""}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-6 left-6 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                </div>
              </Link>

              <div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="inline-flex items-center gap-1 text-primary font-semibold">
                    <Tag className="w-4 h-4" />
                    {featuredPost.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(featuredPost.publishDate)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <Link href={`/blog/${featuredPost.slug}`}>
                  <h2 className="text-4xl md:text-5xl font-display italic mb-4 leading-tight hover:text-primary transition-colors cursor-pointer">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <Link href={`/blog/${featuredPost.slug}`}>
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    Read Full Article
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.image || ""}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </Link>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="inline-flex items-center gap-1 text-primary font-semibold">
                      <Tag className="w-3 h-3" />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.publishDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary font-semibold text-sm hover:underline inline-flex items-center gap-1"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {regularPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No posts found in this category yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section for GEO */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <span className="text-primary tracking-widest uppercase text-xs font-bold">Common Questions</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mt-2 sm:mt-3">Wedding Planning FAQs</h2>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">Quick answers from our expert planners</p>
          </motion.div>

          <div className="space-y-4">
            {blogFaqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-gradient-to-br from-surface-rose/30 to-white rounded-xl sm:rounded-2xl border border-primary/10 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 sm:p-6 cursor-pointer list-none hover:bg-surface-rose/50 transition-colors">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base pr-4">{faq.question}</h3>
                  <ChevronDown className="w-5 h-5 text-primary flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display italic mb-4">
              Get Wedding Planning Tips Delivered
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join <strong>5,000+ couples</strong> receiving exclusive planning guides, vendor recommendations, and insider tips from our luxury wedding experts.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Weekly Tips
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Free Checklists
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Vendor Deals
              </span>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-5 sm:px-6 py-3 sm:py-4 rounded-full border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm sm:text-base"
                />
                <Button
                  type="submit"
                  className="bg-primary text-white hover:bg-primary/90 px-6 sm:px-8 py-3 sm:py-4 rounded-full whitespace-nowrap text-sm sm:text-base"
                >
                  Subscribe Free
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#221015] via-[#2d1a20] to-[#221015]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display italic text-white mb-3 sm:mb-4">
              Ready to Start Planning Your Dream Wedding?
            </h2>
            <p className="text-white/70 text-sm sm:text-base mb-6">
              Get personalized advice from our expert team. Free consultation, no obligation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contact">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all inline-flex items-center justify-center gap-2 text-sm sm:text-base">
                  Schedule Consultation
                  <Heart className="w-4 h-4" />
                </button>
              </Link>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all inline-flex items-center justify-center gap-2 text-sm sm:text-base">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
