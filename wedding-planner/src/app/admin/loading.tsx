"use client";

import { motion } from "framer-motion";

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-8 w-48 bg-stone-200 rounded-lg animate-pulse mb-2" />
          <div className="h-4 w-64 bg-stone-100 rounded animate-pulse" />
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-stone-200 animate-pulse" />
                <div>
                  <div className="h-6 w-12 bg-stone-200 rounded animate-pulse mb-2" />
                  <div className="h-3 w-16 bg-stone-100 rounded animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
          <div className="flex justify-between mb-6">
            <div className="h-6 w-32 bg-stone-200 rounded animate-pulse" />
            <div className="h-10 w-32 bg-amber-100 rounded-xl animate-pulse" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 border-b border-stone-100">
                <div className="w-12 h-12 rounded-xl bg-stone-200 animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 w-48 bg-stone-200 rounded animate-pulse mb-2" />
                  <div className="h-3 w-32 bg-stone-100 rounded animate-pulse" />
                </div>
                <div className="h-8 w-20 bg-stone-100 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
