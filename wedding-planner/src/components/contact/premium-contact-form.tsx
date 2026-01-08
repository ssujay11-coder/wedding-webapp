"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Users, IndianRupee, MapPin, Heart, Send, Check } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface FormData {
  name: string;
  email: string;
  phone: string;
  weddingDate: string;
  destination: string;
  guestCount: string;
  budget: string;
  message: string;
  serviceType: string;
}

export function PremiumContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    weddingDate: "",
    destination: "",
    guestCount: "",
    budget: "",
    message: "",
    serviceType: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const destinations = [
    "Goa", "Udaipur", "Jaipur", "Jodhpur", "Dubai", "Jim Corbett", "Not Sure Yet"
  ];

  const budgetRanges = [
    "₹10-20 Lakhs", "₹20-50 Lakhs", "₹50 Lakhs - 1 Crore", "₹1-2 Crore", "₹2+ Crore"
  ];

  const serviceTypes = [
    "Full-Service Planning", "Destination Management", "Design & Styling", "Day-of Coordination"
  ];

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (!formData.weddingDate) newErrors.weddingDate = "Wedding date is required";
    if (!formData.guestCount) newErrors.guestCount = "Guest count is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Store in Supabase
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: dbError } = await (supabase as any).from('leads').insert([{
        wedding_date: formData.weddingDate,
        guest_count: parseInt(formData.guestCount) || null,
        budget_range: formData.budget,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        destination: formData.destination,
        service_type: formData.serviceType,
        message: formData.message,
        status: 'new',
        source: 'contact_form'
      }]);

      if (dbError) console.error("Database error:", dbError);

      // Send emails via API
      try {
        const response = await fetch('/api/send-inquiry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            weddingDate: formData.weddingDate,
            destination: formData.destination,
            guestCount: formData.guestCount,
            budget: formData.budget,
            message: `Service Type: ${formData.serviceType}\n\n${formData.message}`,
          }),
        });

        if (!response.ok) {
          console.error('Email API error:', await response.text());
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-12 shadow-2xl text-center max-w-2xl mx-auto"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10" />
        </div>
        <h2 className="text-4xl font-display italic text-foreground mb-4">
          Thank You, {formData.name}!
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          We've received your inquiry and will be in touch within 24 hours to begin planning your dream wedding.
        </p>
        <p className="text-sm text-muted-foreground">
          A confirmation email has been sent to <span className="font-semibold text-primary">{formData.email}</span>
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-primary/10"
    >
      <div className="mb-8 text-center">
        <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-display italic text-foreground mb-2">
          Let's Create Magic Together
        </h2>
        <p className="text-muted-foreground">
          Share your vision, and we'll bring it to life.
        </p>
      </div>

      <div className="space-y-6">
        {/* Service Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Service You're Interested In
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {serviceTypes.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => handleChange("serviceType", service)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  formData.serviceType === service
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50 bg-white"
                }`}
              >
                <span className="font-medium text-sm">{service}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Your Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.name ? "border-red-500" : "border-border focus:border-primary"
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.email ? "border-red-500" : "border-border focus:border-primary"
              }`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Phone and Wedding Date Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Wedding Date *
            </label>
            <input
              type="date"
              value={formData.weddingDate}
              onChange={(e) => handleChange("weddingDate", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.weddingDate ? "border-red-500" : "border-border focus:border-primary"
              }`}
            />
            {errors.weddingDate && <p className="text-red-500 text-xs mt-1">{errors.weddingDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.phone ? "border-red-500" : "border-border focus:border-primary"
              }`}
              placeholder="+91 98765 43210"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Destination Selection */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Preferred Destination
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {destinations.map((dest) => (
              <button
                key={dest}
                type="button"
                onClick={() => handleChange("destination", dest)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  formData.destination === dest
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50 bg-white"
                }`}
              >
                <span className="font-medium text-sm">{dest}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Guest Count and Budget Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Guest Count *
            </label>
            <input
              type="number"
              value={formData.guestCount}
              onChange={(e) => handleChange("guestCount", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.guestCount ? "border-red-500" : "border-border focus:border-primary"
              }`}
              placeholder="Approximate number"
              min="1"
            />
            {errors.guestCount && <p className="text-red-500 text-xs mt-1">{errors.guestCount}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-primary" />
              Budget Range
            </label>
            <select
              value={formData.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select budget range</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Tell Us About Your Dream Wedding
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            rows={5}
            className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            placeholder="Share your vision, theme ideas, special requests, or any questions you have..."
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white hover:bg-primary/90 text-lg py-7 rounded-full shadow-xl hover:shadow-primary/25 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Sending...
            </>
          ) : (
            <>
              Send Inquiry
              <Send className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground mt-4">
          By submitting this form, you agree to our privacy policy and consent to be contacted by Elite Wedding Planner.
        </p>
      </div>
    </motion.form>
  );
}
