"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Users, MapPin, Sparkles, IndianRupee, PieChart, Download, Share2, ChevronDown, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BudgetBreakdown {
  category: string;
  percentage: number;
  amount: number;
  icon: React.ReactNode;
  description: string;
  tips: string[];
}

const budgetCategories = [
  { name: "Venue & Catering", percentage: 35, icon: "🏰", description: "Venue rental, food & beverages, service staff" },
  { name: "Decor & Florals", percentage: 15, icon: "🌸", description: "Mandap, stage, centerpieces, lighting" },
  { name: "Photography & Video", percentage: 12, icon: "📸", description: "Pre-wedding, wedding day, post-production" },
  { name: "Entertainment", percentage: 8, icon: "🎵", description: "DJ, live band, choreography, performances" },
  { name: "Attire & Beauty", percentage: 10, icon: "👗", description: "Bridal, groom, makeup, jewelry" },
  { name: "Invitations & Stationery", percentage: 3, icon: "💌", description: "Save-the-dates, invites, menus, signage" },
  { name: "Guest Hospitality", percentage: 8, icon: "🎁", description: "Welcome bags, favors, transport" },
  { name: "Wedding Planner", percentage: 5, icon: "📋", description: "Planning fees, coordination" },
  { name: "Contingency", percentage: 4, icon: "💰", description: "Buffer for unexpected expenses" },
];

const destinationMultipliers: Record<string, number> = {
  udaipur: 1.4,
  jaipur: 1.2,
  jodhpur: 1.15,
  goa: 1.25,
  kerala: 1.1,
  mumbai: 1.3,
  delhi: 1.25,
  dubai: 2.0,
  thailand: 1.5,
  other: 1.0,
};

const styleMultipliers: Record<string, number> = {
  intimate: 0.8,
  classic: 1.0,
  luxurious: 1.5,
  royal: 2.0,
  destination: 1.3,
};

export function BudgetCalculator() {
  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState<number>(2500000); // 25 Lakhs default
  const [guestCount, setGuestCount] = useState<number>(200);
  const [destination, setDestination] = useState<string>("udaipur");
  const [weddingStyle, setWeddingStyle] = useState<string>("luxurious");
  const [events, setEvents] = useState<string[]>(["mehendi", "sangeet", "wedding", "reception"]);
  const [showResults, setShowResults] = useState(false);

  const eventsList = [
    { id: "mehendi", name: "Mehendi", icon: "🖐️" },
    { id: "haldi", name: "Haldi", icon: "💛" },
    { id: "sangeet", name: "Sangeet", icon: "💃" },
    { id: "cocktail", name: "Cocktail", icon: "🍸" },
    { id: "wedding", name: "Wedding Ceremony", icon: "💒" },
    { id: "reception", name: "Reception", icon: "🎊" },
  ];

  const budgetPresets = [
    { label: "₹15-25 Lakhs", value: 2000000, tier: "Intimate Luxury" },
    { label: "₹25-50 Lakhs", value: 3750000, tier: "Classic Elegance" },
    { label: "₹50-75 Lakhs", value: 6250000, tier: "Grand Celebration" },
    { label: "₹75L - 1 Crore", value: 8750000, tier: "Royal Affair" },
    { label: "₹1-2 Crore", value: 15000000, tier: "Ultra Luxury" },
    { label: "₹2+ Crore", value: 25000000, tier: "Bespoke Extravagance" },
  ];

  // Calculate adjusted budget based on factors
  const adjustedBudget = useMemo(() => {
    const destMultiplier = destinationMultipliers[destination] || 1.0;
    const styleMultiplier = styleMultipliers[weddingStyle] || 1.0;
    const eventMultiplier = 0.85 + (events.length * 0.05); // Base 85% + 5% per event
    const guestMultiplier = guestCount > 300 ? 1.15 : guestCount > 150 ? 1.0 : 0.9;

    return budget / (destMultiplier * styleMultiplier * eventMultiplier * guestMultiplier);
  }, [budget, destination, weddingStyle, events, guestCount]);

  // Calculate breakdown
  const breakdown = useMemo((): BudgetBreakdown[] => {
    return budgetCategories.map(cat => ({
      category: cat.name,
      percentage: cat.percentage,
      description: cat.description,
      amount: Math.round((adjustedBudget * cat.percentage) / 100),
      icon: cat.icon,
      tips: getTipsForCategory(cat.name, adjustedBudget),
    }));
  }, [adjustedBudget]);

  function getTipsForCategory(category: string, budget: number): string[] {
    const tips: Record<string, string[]> = {
      "Venue & Catering": [
        "Consider off-season dates for 20-30% savings",
        "All-inclusive packages often offer better value",
        "Negotiate room blocks for guest accommodations",
      ],
      "Decor & Florals": [
        "Use local, seasonal flowers to reduce costs",
        "Repurpose ceremony decor for reception",
        "LED candles are cheaper than real florals for ambiance",
      ],
      "Photography & Video": [
        "Book 12-18 months in advance for top photographers",
        "Consider a team (lead + assistants) for better coverage",
        "Drone footage adds cinematic value",
      ],
      "Entertainment": [
        "Local bands are often more affordable",
        "DJ + live instruments is a great combo",
        "Plan sangeet acts early for choreography time",
      ],
      "Attire & Beauty": [
        "Designer trunk shows offer discounts",
        "Book hair/makeup trial 6 months ahead",
        "Consider rental jewelry for sangeet/cocktail",
      ],
    };
    return tips[category] || ["Allocate wisely and track expenses"];
  }

  const perGuestCost = Math.round(adjustedBudget / guestCount);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`;
    }
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const handleCalculate = () => {
    setShowResults(true);
    setStep(4);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-rose-400 p-8 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Calculator className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-display italic">Wedding Budget Calculator</h2>
            <p className="text-white/80">Plan your dream wedding with precision</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mt-8">
          {["Budget", "Details", "Events", "Results"].map((label, i) => (
            <div key={label} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step > i + 1 ? "bg-white text-primary" : step === i + 1 ? "bg-white/30 text-white" : "bg-white/10 text-white/50"
              }`}>
                {step > i + 1 ? <CheckCircle className="w-5 h-5" /> : i + 1}
              </div>
              <span className={`ml-2 text-sm ${step === i + 1 ? "text-white" : "text-white/60"}`}>{label}</span>
              {i < 3 && <div className={`w-16 h-0.5 mx-4 ${step > i + 1 ? "bg-white" : "bg-white/20"}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Budget Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-display italic text-center mb-8">
                What's your total wedding budget?
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {budgetPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setBudget(preset.value)}
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${
                      budget === preset.value
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                  >
                    <span className="text-2xl font-bold text-foreground">{preset.label}</span>
                    <p className="text-sm text-muted-foreground mt-1">{preset.tier}</p>
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <label className="text-sm font-medium text-muted-foreground">Or enter custom amount</label>
                <div className="flex items-center gap-2 mt-2">
                  <IndianRupee className="w-5 h-5 text-muted-foreground" />
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none text-lg"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                className="w-full bg-primary text-white py-6 text-lg rounded-full mt-8"
              >
                Continue
              </Button>
            </motion.div>
          )}

          {/* Step 2: Guest Count & Destination */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-primary" />
                  Expected Guest Count
                </h3>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>50</span>
                  <span className="text-primary font-bold text-xl">{guestCount} Guests</span>
                  <span>1000+</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  Wedding Destination
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries({
                    udaipur: "Udaipur 🏰",
                    jaipur: "Jaipur 🌸",
                    jodhpur: "Jodhpur 🏜️",
                    goa: "Goa 🏖️",
                    kerala: "Kerala 🌴",
                    mumbai: "Mumbai 🌃",
                    delhi: "Delhi 🕌",
                    dubai: "Dubai ✨",
                    other: "Other 📍",
                  }).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setDestination(key)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        destination === key
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Wedding Style
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries({
                    intimate: "Intimate 💕",
                    classic: "Classic ✨",
                    luxurious: "Luxurious 👑",
                    royal: "Royal 🏰",
                    destination: "Destination 🌍",
                  }).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setWeddingStyle(key)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        weddingStyle === key
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 py-6 rounded-full">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1 bg-primary text-white py-6 rounded-full">
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Events Selection */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-display italic text-center mb-8">
                Which events are you planning?
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {eventsList.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => {
                      setEvents(prev =>
                        prev.includes(event.id)
                          ? prev.filter(e => e !== event.id)
                          : [...prev, event.id]
                      );
                    }}
                    className={`p-6 rounded-2xl border-2 transition-all text-center ${
                      events.includes(event.id)
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                  >
                    <span className="text-3xl block mb-2">{event.icon}</span>
                    <span className="font-semibold">{event.name}</span>
                    {events.includes(event.id) && (
                      <CheckCircle className="w-5 h-5 text-primary mx-auto mt-2" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1 py-6 rounded-full">
                  Back
                </Button>
                <Button onClick={handleCalculate} className="flex-1 bg-primary text-white py-6 rounded-full">
                  Calculate Budget
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {step === 4 && showResults && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Summary Card */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
                <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Your Recommended Budget</p>
                <h2 className="text-5xl font-display italic text-primary mb-2">
                  {formatCurrency(adjustedBudget)}
                </h2>
                <p className="text-muted-foreground">
                  ~{formatCurrency(perGuestCost)} per guest for {guestCount} guests
                </p>
                <div className="flex justify-center gap-8 mt-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">Destination:</span>
                    <span className="font-semibold ml-1 capitalize">{destination}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Style:</span>
                    <span className="font-semibold ml-1 capitalize">{weddingStyle}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Events:</span>
                    <span className="font-semibold ml-1">{events.length}</span>
                  </div>
                </div>
              </div>

              {/* Budget Breakdown */}
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-6">
                  <PieChart className="w-5 h-5 text-primary" />
                  Budget Breakdown
                </h3>

                <div className="space-y-4">
                  {breakdown.map((item, index) => (
                    <motion.div
                      key={item.category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gray-50 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <h4 className="font-semibold">{item.category}</h4>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-primary">{formatCurrency(item.amount)}</span>
                          <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-primary to-rose-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-6 border-t">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 py-4 rounded-full">
                  Recalculate
                </Button>
                <Button className="flex-1 bg-primary text-white py-4 rounded-full">
                  Get Free Consultation
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
