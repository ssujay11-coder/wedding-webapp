"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-xl mx-auto text-center px-6 py-20">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-4xl md:text-5xl font-serif italic text-gray-900 mb-4">
            Oops! Something Went Wrong
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We're sorry, but something unexpected happened. Please try refreshing the page.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-[#8B4B62] text-white rounded-full hover:bg-[#7a4256] transition-colors font-semibold"
            >
              <RefreshCcw className="w-5 h-5" />
              Try Again
            </button>
            <a
              href="/"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-full hover:border-[#8B4B62] hover:text-[#8B4B62] transition-colors font-semibold"
            >
              <Home className="w-5 h-5" />
              Go Home
            </a>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-gray-500">
            <p>Need help? Call us at <a href="tel:+919869829673" className="text-[#8B4B62]">+91 9869829673</a></p>
          </div>
        </div>
      </body>
    </html>
  );
}
