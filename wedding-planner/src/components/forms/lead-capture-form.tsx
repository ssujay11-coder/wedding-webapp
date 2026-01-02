"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  MapPin,
  Phone,
  ArrowRight,
  Check,
  Sparkles,
  Heart,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface LeadCaptureFormProps {
  variant?: "hero" | "sidebar" | "inline" | "modal" | "minimal";
  heading?: string;
  subheading?: string;
  ctaText?: string;
  source?: string;
  className?: string;
  onSuccess?: () => void;
  dark?: boolean;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  weddingDate: string;
  guests: string;
  location: string;
}

export function LeadCaptureForm({
  variant = "inline",
  heading = "Get Your Free Wedding Consultation",
  subheading = "Share your vision and we'll create magic together",
  ctaText = "Get Free Quote",
  source = "website",
  className = "",
  onSuccess,
  dark = false,
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    weddingDate: "",
    guests: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Enter valid 10-digit number";
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    onSuccess?.();

    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        weddingDate: "",
        guests: "",
        location: "",
      });
    }, 5000);
  };

  const inputStyles = dark
    ? "w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none transition-all backdrop-blur-sm"
    : "w-full px-4 py-3.5 bg-white border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all";

  const labelStyles = dark
    ? "block text-sm font-medium text-white/80 mb-1.5"
    : "block text-sm font-medium text-foreground mb-1.5";

  // Success State
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center py-12 ${className}`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${
            dark ? "bg-secondary/20" : "bg-primary/10"
          }`}
        >
          <Check className={`w-10 h-10 ${dark ? "text-secondary" : "text-primary"}`} />
        </motion.div>
        <h3 className={`text-2xl font-display italic mb-3 ${dark ? "text-white" : "text-foreground"}`}>
          Thank You!
        </h3>
        <p className={dark ? "text-white/80" : "text-muted-foreground"}>
          Our wedding expert will call you within 24 hours.
        </p>
      </motion.div>
    );
  }

  // Minimal variant (just phone capture)
  if (variant === "minimal") {
    return (
      <form onSubmit={handleSubmit} className={className}>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${dark ? "text-white/50" : "text-muted-foreground"}`} />
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`${inputStyles} pl-12`}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3.5 rounded-xl font-semibold whitespace-nowrap"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : ctaText}
          </Button>
        </div>
        {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
      </form>
    );
  }

  // Hero variant (horizontal, prominent)
  if (variant === "hero") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={`w-full max-w-4xl mx-auto ${className}`}
      >
        <div className={`p-1 rounded-2xl ${dark ? "bg-white/10 backdrop-blur-md" : "bg-white/80 backdrop-blur-md shadow-2xl"}`}>
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputStyles}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1 absolute">{errors.name}</p>}
              </div>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={inputStyles}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1 absolute">{errors.phone}</p>}
              </div>
              <div className="relative">
                <Calendar className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${dark ? "text-white/40" : "text-muted-foreground"}`} />
                <input
                  type="date"
                  placeholder="Wedding Date"
                  value={formData.weddingDate}
                  onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  className={inputStyles}
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-primary/30 transition-all"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {ctaText}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </div>
            <p className={`text-center text-xs mt-4 ${dark ? "text-white/60" : "text-muted-foreground"}`}>
              <Sparkles className="w-3 h-3 inline mr-1" />
              Free consultation with our senior wedding planner
            </p>
          </form>
        </div>
      </motion.div>
    );
  }

  // Sidebar variant (vertical, compact)
  if (variant === "sidebar") {
    return (
      <div className={`${dark ? "bg-primary/95" : "bg-gradient-to-br from-primary/5 via-white to-secondary/5 border border-primary/10"} rounded-3xl p-8 ${className}`}>
        <div className="text-center mb-6">
          <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 ${dark ? "bg-white/10" : "bg-primary/10"}`}>
            <Heart className={`w-7 h-7 ${dark ? "text-secondary" : "text-primary"}`} />
          </div>
          <h3 className={`text-xl font-display italic mb-2 ${dark ? "text-white" : "text-foreground"}`}>
            {heading}
          </h3>
          <p className={`text-sm ${dark ? "text-white/70" : "text-muted-foreground"}`}>
            {subheading}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputStyles}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="tel"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={inputStyles}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email (Optional)"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputStyles}
            />
          </div>

          <div className="relative">
            <Calendar className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${dark ? "text-white/40" : "text-muted-foreground"}`} />
            <input
              type="date"
              placeholder="Tentative Wedding Date"
              value={formData.weddingDate}
              onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
              className={inputStyles}
            />
          </div>

          <select
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
            className={inputStyles}
          >
            <option value="">Expected Guests</option>
            <option value="50-100">50 - 100 guests</option>
            <option value="100-200">100 - 200 guests</option>
            <option value="200-500">200 - 500 guests</option>
            <option value="500+">500+ guests</option>
          </select>

          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              dark
                ? "bg-white text-primary hover:bg-white/90"
                : "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-primary/30"
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              <span className="flex items-center justify-center gap-2">
                {ctaText}
                <ArrowRight className="w-5 h-5" />
              </span>
            )}
          </Button>

          <p className={`text-center text-xs ${dark ? "text-white/60" : "text-muted-foreground"}`}>
            We'll respond within 2 hours during business hours
          </p>
        </form>
      </div>
    );
  }

  // Modal variant
  if (variant === "modal") {
    return (
      <div className={`bg-white rounded-3xl p-8 max-w-lg mx-auto ${className}`}>
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h3 className="text-2xl font-display italic text-foreground mb-2">
            {heading}
          </h3>
          <p className="text-muted-foreground">
            {subheading}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelStyles}>Your Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputStyles}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className={labelStyles}>Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={inputStyles}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className={labelStyles}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputStyles}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelStyles}>Wedding Date</label>
              <input
                type="date"
                value={formData.weddingDate}
                onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                className={inputStyles}
              />
            </div>
            <div>
              <label className={labelStyles}>Guests</label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className={inputStyles}
              >
                <option value="">Select</option>
                <option value="50-100">50 - 100</option>
                <option value="100-200">100 - 200</option>
                <option value="200-500">200 - 500</option>
                <option value="500+">500+</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelStyles}>Preferred Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="e.g., Udaipur, Goa, Jaipur"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={`${inputStyles} pl-10`}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-primary/30 transition-all"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              <span className="flex items-center justify-center gap-2">
                {ctaText}
                <ArrowRight className="w-5 h-5" />
              </span>
            )}
          </Button>
        </form>
      </div>
    );
  }

  // Default inline variant
  return (
    <div className={`${dark ? "bg-white/5 backdrop-blur-md border border-white/10" : "bg-white border border-border shadow-xl"} rounded-2xl p-6 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Your Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputStyles}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="tel"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={inputStyles}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            placeholder="Wedding Date"
            value={formData.weddingDate}
            onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
            className={inputStyles}
          />
          <select
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
            className={inputStyles}
          >
            <option value="">Expected Guests</option>
            <option value="50-100">50 - 100 guests</option>
            <option value="100-200">100 - 200 guests</option>
            <option value="200-500">200 - 500 guests</option>
            <option value="500+">500+ guests</option>
          </select>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-primary/30 transition-all"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            <span className="flex items-center justify-center gap-2">
              {ctaText}
              <ArrowRight className="w-5 h-5" />
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}

// Quick Callback Form - ultra minimal
export function QuickCallbackForm({
  dark = false,
  className = ""
}: {
  dark?: boolean;
  className?: string;
}) {
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !/^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""))) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex items-center gap-3 ${className}`}
      >
        <Check className={dark ? "text-secondary" : "text-primary"} />
        <span className={dark ? "text-white" : "text-foreground"}>
          We'll call you shortly!
        </span>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <div className="relative flex-1">
        <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${dark ? "text-white/50" : "text-muted-foreground"}`} />
        <input
          type="tel"
          placeholder="Your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 rounded-full text-sm ${
            dark
              ? "bg-white/10 border border-white/20 text-white placeholder:text-white/50"
              : "bg-white border border-border text-foreground"
          } focus:outline-none focus:ring-2 focus:ring-primary/30`}
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full text-sm font-semibold whitespace-nowrap"
      >
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Get Callback"}
      </Button>
    </form>
  );
}
