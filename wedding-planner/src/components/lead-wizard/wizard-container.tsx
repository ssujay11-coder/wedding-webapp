"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LeadData, WizardStep } from "./types";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { DateGuestStep, BudgetStep, StyleStep, ContactStep } from "./steps";
import { supabase } from "@/lib/supabase/client";

const steps: WizardStep[] = [
    "intro",
    "date-guests",
    "budget",
    "style",
    "contact",
    "completed",
];

export function WizardContainer() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [formData, setFormData] = useState<Partial<LeadData>>({
        stylePreferences: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentStep = steps[currentStepIndex];

    const updateData = (data: Partial<LeadData>) => {
        setFormData((prev) => ({ ...prev, ...data }));
    };

    const nextStep = () => {
        setDirection(1);
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        setDirection(-1);
        if (currentStepIndex > 0) {
            setCurrentStepIndex((prev) => prev - 1);
        }
    };

    const submitLead = async () => {
        setIsSubmitting(true);
        try {
            // Store in Supabase
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error: dbError } = await (supabase as any).from('leads').insert([{
                wedding_date: formData.weddingDate,
                guest_count: formData.guestCount,
                budget_range: formData.budgetRange,
                style_preferences: formData.stylePreferences,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                status: 'new'
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
                        guestCount: formData.guestCount,
                        budget: formData.budgetRange,
                        message: `Style Preferences: ${formData.stylePreferences?.join(', ') || 'Not specified'}`,
                    }),
                });

                if (!response.ok) {
                    console.error('Email API error:', await response.text());
                }
            } catch (emailError) {
                console.error('Email sending error:', emailError);
            }

            nextStep(); // Go to 'completed'
        } catch (error) {
            console.error("Error submitting lead:", error);
            // Ideally show toast error here
        } finally {
            setIsSubmitting(false);
        }
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 500 : -500,
            opacity: 0,
        }),
    };

    const renderStep = () => {
        switch (currentStep) {
            case "intro":
                return (
                    <div className="space-y-6 animate-in zoom-in duration-500">
                        <h2 className="font-heading text-5xl text-primary font-bold leading-tight">Plan Your Dream Wedding</h2>
                        <p className="text-xl text-muted-foreground font-light max-w-md mx-auto">
                            Experience the world's most luxurious planning platform. Let's start with your vision.
                        </p>
                        <Button size="lg" onClick={nextStep} className="mt-8 text-lg px-10 py-7 rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl hover:shadow-primary/25 transition-all hover:scale-105">
                            Start Planning <ChevronRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                );
            case "date-guests":
                return <DateGuestStep formData={formData} updateData={updateData} onNext={nextStep} />;
            case "budget":
                return <BudgetStep formData={formData} updateData={updateData} onNext={nextStep} />;
            case "style":
                return <StyleStep formData={formData} updateData={updateData} onNext={nextStep} />;
            case "contact":
                return <ContactStep formData={formData} updateData={updateData} onNext={submitLead} loading={isSubmitting} />;
            case "completed":
                return (
                    <div className="space-y-6 text-center animate-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h2 className="font-heading text-4xl text-primary">Congratulations!</h2>
                        <p className="text-lg text-muted-foreground">Your request has been received. One of our luxury planners will contact you shortly.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-8 min-h-[600px] flex flex-col justify-center relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50">
            <div className="absolute top-8 left-8 z-20">
                {currentStepIndex > 0 && currentStep !== 'completed' && (
                    <Button variant="ghost" size="icon" onClick={prevStep} className="hover:bg-primary/10 transition-colors">
                        <ArrowLeft className="w-6 h-6 text-primary" />
                    </Button>
                )}
            </div>

            <div className="w-full relative h-full flex flex-col px-4 md:px-12">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentStepIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        className="w-full flex-1 flex flex-col items-center justify-center text-center py-8"
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-muted/30">
                <motion.div
                    className="h-full bg-gradient-to-r from-primary to-rose-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStepIndex) / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </div>
    );
}
