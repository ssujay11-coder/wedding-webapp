"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LeadData } from "./types";
import { motion } from "framer-motion";

interface StepProps {
    formData: Partial<LeadData>;
    updateData: (data: Partial<LeadData>) => void;
    onNext: () => void;
}

export function DateGuestStep({ formData, updateData, onNext }: StepProps) {
    return (
        <div className="space-y-8 w-full max-w-lg mx-auto text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <h3 className="text-4xl font-heading text-primary">Save the Date</h3>
                <p className="text-muted-foreground font-light">When are you planning to tie the knot?</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-3">
                    <Label htmlFor="date" className="text-base font-medium text-foreground/80">Tentative Date</Label>
                    <Input
                        type="date"
                        id="date"
                        className="w-full bg-white border-primary/20 focus:border-primary h-14 text-lg rounded-xl shadow-sm transition-all focus:ring-4 focus:ring-primary/10"
                        value={formData.weddingDate ? new Date(formData.weddingDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => updateData({ weddingDate: e.target.value ? new Date(e.target.value) : undefined })}
                    />
                </div>
                <div className="space-y-3">
                    <Label htmlFor="guests" className="text-base font-medium text-foreground/80">Estimated Guest Count</Label>
                    <Input
                        type="text"
                        id="guests"
                        placeholder="e.g. 150-200"
                        className="w-full bg-white border-primary/20 focus:border-primary h-14 text-lg rounded-xl shadow-sm transition-all focus:ring-4 focus:ring-primary/10"
                        value={formData.guestCount || ''}
                        onChange={(e) => updateData({ guestCount: e.target.value })}
                    />
                </div>
                <Button onClick={onNext} className="w-full mt-6 bg-primary hover:bg-primary/90 text-white rounded-full py-7 text-xl shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300">
                    Continue
                </Button>
            </div>
        </div>
    );
}

export function BudgetStep({ formData, updateData, onNext }: StepProps) {
    const budgets = [
        { val: 10000, label: "Intimate", sub: "Up to $10,000" },
        { val: 25000, label: "Classic", sub: "$10k - $25k" },
        { val: 50000, label: "Lavish", sub: "$25k - $50k" },
        { val: 100000, label: "Grand", sub: "$50k - $100k" },
    ];

    return (
        <div className="space-y-8 w-full max-w-lg mx-auto text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <h3 className="text-4xl font-heading text-primary">Budget Range</h3>
                <p className="text-muted-foreground font-light">Help us curate options within your comfort zone.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {budgets.map((b) => (
                    <button
                        key={b.val}
                        onClick={() => {
                            updateData({ budgetRange: b.val });
                            setTimeout(onNext, 200);
                        }}
                        className={`p-5 rounded-2xl border transition-all text-left flex justify-between items-center group hover:bg-white hover:shadow-md ${formData.budgetRange === b.val ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary' : 'border-border bg-white/50 hover:border-primary/50'}`}
                    >
                        <div>
                            <span className={`text-lg font-heading block group-hover:text-primary transition-colors ${formData.budgetRange === b.val ? 'text-primary' : 'text-foreground'}`}>{b.label}</span>
                            <span className="text-sm text-muted-foreground">{b.sub}</span>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${formData.budgetRange === b.val ? 'border-primary' : 'border-muted group-hover:border-primary/50'}`}>
                            {formData.budgetRange === b.val && <div className="w-3 h-3 bg-primary rounded-full" />}
                        </div>
                    </button>
                ))}
                <button
                    onClick={() => {
                        updateData({ budgetRange: 999999 });
                        setTimeout(onNext, 200);
                    }}
                    className={`p-5 rounded-2xl border transition-all text-left flex justify-between items-center group hover:bg-white hover:shadow-md ${formData.budgetRange === 999999 ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary' : 'border-border bg-white/50 hover:border-primary/50'}`}
                >
                    <div>
                        <span className={`text-lg font-heading block group-hover:text-primary transition-colors ${formData.budgetRange === 999999 ? 'text-primary' : 'text-foreground'}`}>No Limit</span>
                        <span className="text-sm text-muted-foreground">Luxury without bounds</span>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${formData.budgetRange === 999999 ? 'border-primary' : 'border-muted group-hover:border-primary/50'}`}>
                        {formData.budgetRange === 999999 && <div className="w-3 h-3 bg-primary rounded-full" />}
                    </div>
                </button>
            </div>
        </div>
    );
}

export function StyleStep({ formData, updateData, onNext }: StepProps) {
    const styles = ["Modern", "Traditional", "Bohemian", "Royal", "Beach", "Minimalist"];

    const toggleStyle = (style: string) => {
        const current = formData.stylePreferences || [];
        const updated = current.includes(style)
            ? current.filter(s => s !== style)
            : [...current, style];
        updateData({ stylePreferences: updated });
    }

    return (
        <div className="space-y-8 w-full max-w-lg mx-auto text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <h3 className="text-4xl font-heading text-primary">Your Aesthetic</h3>
                <p className="text-muted-foreground font-light">Select the vibes that resonate with you.</p>
            </div>

            <div className="flex flex-wrap gap-3">
                {styles.map((style) => (
                    <button
                        key={style}
                        onClick={() => toggleStyle(style)}
                        className={`px-8 py-4 rounded-full border text-lg transition-all ${formData.stylePreferences?.includes(style) ? 'bg-primary text-white border-primary shadow-lg scale-105' : 'bg-white border-muted hover:border-primary text-muted-foreground hover:text-foreground'}`}
                    >
                        {style}
                    </button>
                ))}
            </div>
            <Button onClick={onNext} className="w-full mt-10 bg-primary hover:bg-primary/90 text-white rounded-full py-7 text-xl shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300">
                Next Step
            </Button>
        </div>
    );
}

export function ContactStep({ formData, updateData, onNext, loading }: StepProps & { loading?: boolean }) {
    return (
        <div className="space-y-8 w-full max-w-lg mx-auto text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <h3 className="text-4xl font-heading text-primary">Final Details</h3>
                <p className="text-muted-foreground font-light">We'll reach out to discuss your vision.</p>
            </div>

            <div className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-medium text-foreground/80">Full Name</Label>
                    <Input
                        id="name"
                        value={formData.name || ''}
                        onChange={e => updateData({ name: e.target.value })}
                        className="h-14 bg-white border-primary/20 focus:border-primary text-lg rounded-xl"
                        placeholder="Your Name"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium text-foreground/80">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email || ''}
                        onChange={e => updateData({ email: e.target.value })}
                        className="h-14 bg-white border-primary/20 focus:border-primary text-lg rounded-xl"
                        placeholder="name@example.com"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-medium text-foreground/80">Phone Number</Label>
                    <Input
                        id="phone"
                        type="tel"
                        value={formData.phone || ''}
                        onChange={e => updateData({ phone: e.target.value })}
                        className="h-14 bg-white border-primary/20 focus:border-primary text-lg rounded-xl"
                        placeholder="+1 (555) 000-0000"
                    />
                </div>
                <Button onClick={onNext} disabled={loading} className="w-full mt-6 bg-primary hover:bg-primary/90 text-white rounded-full py-7 text-xl shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed">
                    {loading ? "Submitting..." : "Get My Wedding Plan"}
                </Button>
            </div>
        </div>
    );
}
