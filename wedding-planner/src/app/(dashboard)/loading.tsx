"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <Loader2 className="w-10 h-10 animate-spin text-rose-500 mx-auto mb-4" />
        <p className="text-gray-500">Loading your dashboard...</p>
      </motion.div>
    </div>
  );
}
