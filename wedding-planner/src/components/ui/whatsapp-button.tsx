"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, Send, Clock } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
  position?: "bottom-right" | "bottom-left";
  showPulse?: boolean;
}

export function WhatsAppButton({
  phoneNumber = "919869829673",
  defaultMessage = "Hi! I'm interested in planning my wedding with Elite Wedding Planner. Can we discuss?",
  position = "bottom-right",
  showPulse = true,
}: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(defaultMessage);
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    // Show after initial delay
    const timer = setTimeout(() => setIsVisible(true), 3000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleSendMessage = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
  };

  const handleCall = () => {
    window.location.href = `tel:+${phoneNumber}`;
  };

  const positionClasses = position === "bottom-right"
    ? "right-6"
    : "left-6";

  // Check if within business hours (10 AM - 7 PM IST)
  const isBusinessHours = () => {
    const now = new Date();
    const istHour = (now.getUTCHours() + 5) % 24 + (now.getUTCMinutes() + 30 >= 60 ? 1 : 0);
    const istMinute = (now.getUTCMinutes() + 30) % 60;
    const totalMinutes = istHour * 60 + istMinute;
    return totalMinutes >= 600 && totalMinutes <= 1140; // 10:00 to 19:00
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 ${positionClasses} z-50`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Elite Wedding Planner</h3>
                    <p className="text-xs text-white/80 flex items-center gap-1">
                      {isBusinessHours() ? (
                        <>
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          Online Now
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" />
                          Typically replies within 1 hour
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Preview */}
            <div className="p-4 bg-[#e5ddd5] min-h-[120px]">
              <div className="bg-white rounded-lg p-3 shadow-sm max-w-[90%] relative">
                <p className="text-sm text-gray-700">
                  Hello! 👋 Thank you for your interest in Elite Wedding Planner.
                  How can we help make your dream wedding a reality?
                </p>
                <span className="text-[10px] text-gray-400 float-right mt-1">
                  {new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
                {/* Tail */}
                <div className="absolute -left-2 top-0 w-4 h-4 bg-white" style={{
                  clipPath: "polygon(100% 0, 0 0, 100% 100%)"
                }} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 bg-gray-50 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-green-500 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors shadow-lg"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

              {/* Call Option */}
              <button
                onClick={handleCall}
                className="w-full mt-3 py-2 text-sm text-gray-600 hover:text-green-600 flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Or call us directly
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-green-600 transition-all"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              {/* WhatsApp Icon */}
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Animation */}
        {showPulse && !isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce">
              1
            </span>
          </>
        )}
      </motion.button>

      {/* Tooltip */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-20 right-0 bg-white px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap"
        >
          <span className="text-gray-700">Chat with us on WhatsApp!</span>
          <div className="absolute -bottom-1 right-6 w-3 h-3 bg-white rotate-45" />
        </motion.div>
      )}
    </div>
  );
}
