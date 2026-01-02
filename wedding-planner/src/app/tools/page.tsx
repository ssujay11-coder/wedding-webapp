import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BudgetCalculator } from "@/components/tools/budget-calculator";
import { Calculator, Calendar, Users, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Wedding Planning Tools | Budget Calculator & More | Elite Wedding Planner",
  description: "Free wedding planning tools to help you plan your dream wedding. Use our budget calculator, guest list manager, and timeline planner for stress-free wedding planning.",
  keywords: ["wedding budget calculator", "wedding planning tools", "wedding checklist", "guest list manager", "wedding timeline"],
};

export default function ToolsPage() {
  const tools = [
    {
      name: "Budget Calculator",
      description: "Get a detailed breakdown of your wedding budget based on your preferences",
      icon: Calculator,
      href: "#budget-calculator",
      available: true,
    },
    {
      name: "Timeline Planner",
      description: "Create a personalized wedding planning timeline with automatic reminders",
      icon: Calendar,
      href: "/tools/timeline",
      available: false,
    },
    {
      name: "Guest List Manager",
      description: "Organize your guest list, track RSVPs, and plan seating arrangements",
      icon: Users,
      href: "/tools/guest-list",
      available: false,
    },
    {
      name: "Style Quiz",
      description: "Discover your wedding style and get personalized venue recommendations",
      icon: Sparkles,
      href: "/tools/style-quiz",
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 text-center bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display italic text-foreground mb-6">
            Wedding Planning Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Free interactive tools to help you plan every detail of your dream wedding.
            From budget breakdowns to timeline planning, we've got you covered.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className={`group p-8 rounded-2xl border-2 transition-all ${
                  tool.available
                    ? "border-primary/20 hover:border-primary hover:shadow-xl bg-white"
                    : "border-gray-200 bg-gray-50 cursor-not-allowed"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    tool.available ? "bg-primary/10 text-primary" : "bg-gray-200 text-gray-400"
                  }`}>
                    <tool.icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-xl font-bold ${
                        tool.available ? "group-hover:text-primary" : "text-gray-400"
                      }`}>
                        {tool.name}
                      </h3>
                      {!tool.available && (
                        <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className={`mt-2 ${tool.available ? "text-muted-foreground" : "text-gray-400"}`}>
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Calculator Section */}
      <section id="budget-calculator" className="py-24 bg-accent">
        <div className="max-w-5xl mx-auto px-6">
          <BudgetCalculator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-rose-400 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display italic mb-6">
            Need Expert Guidance?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Our planning tools are just the beginning. Let our expert team help you
            create the wedding of your dreams.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary px-10 py-4 rounded-full font-semibold hover:bg-white/90 transition-all hover:shadow-2xl"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
