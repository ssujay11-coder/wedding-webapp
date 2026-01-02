"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AlertTriangle, Home, RefreshCcw, Phone } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-xl mx-auto text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-4xl md:text-5xl font-display italic text-foreground mb-4">
            Something Went Wrong
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            We apologize for the inconvenience. An unexpected error occurred while loading this page.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => reset()}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-semibold"
            >
              <RefreshCcw className="w-5 h-5" />
              Try Again
            </button>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-border text-foreground rounded-full hover:border-primary hover:text-primary transition-colors font-semibold"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </div>

          {/* Contact Support */}
          <div className="bg-accent rounded-2xl p-6">
            <p className="text-muted-foreground mb-4">
              If the problem persists, please contact us for assistance.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <Phone className="w-5 h-5" />
              Contact Support
            </Link>
          </div>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 p-4 bg-gray-100 rounded-lg text-left overflow-auto">
              <p className="text-xs font-mono text-gray-600">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs font-mono text-gray-400 mt-2">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
