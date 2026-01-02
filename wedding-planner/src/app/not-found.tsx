import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Home, Search, Phone, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Decorative Element */}
          <div className="mb-8">
            <div className="relative inline-block">
              <span className="text-[200px] font-display italic text-primary/10 leading-none">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-4xl md:text-5xl font-display italic text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
            It seems the page you're looking for has wandered off to a destination wedding.
            Let us help you find your way back.
          </p>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-xl mx-auto">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-semibold"
            >
              <Home className="w-5 h-5" />
              Home
            </Link>
            <Link
              href="/portfolio"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-border text-foreground rounded-full hover:border-primary hover:text-primary transition-colors font-semibold"
            >
              Our Work
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-border text-foreground rounded-full hover:border-primary hover:text-primary transition-colors font-semibold"
            >
              <Phone className="w-5 h-5" />
              Contact
            </Link>
          </div>

          {/* Helpful Suggestions */}
          <div className="bg-accent rounded-2xl p-8 text-left">
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              Looking for something specific?
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <ArrowLeft className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <Link href="/destinations" className="text-primary hover:underline">Explore our destinations</Link>
                  {" "}– Goa, Udaipur, Jaipur, and more
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowLeft className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <Link href="/services" className="text-primary hover:underline">Browse our services</Link>
                  {" "}– Full planning, decor, coordination
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowLeft className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <Link href="/blog" className="text-primary hover:underline">Read our blog</Link>
                  {" "}– Wedding tips, trends, and inspiration
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowLeft className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <Link href="/about" className="text-primary hover:underline">About Elite Wedding Planner</Link>
                  {" "}– Our story and team
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
