"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function StartPlanningButton() {
    const router = useRouter();

    const handleStartPlanning = () => {
        router.push("/contact");
    };

    return (
        <Button
            size="lg"
            onClick={handleStartPlanning}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1"
        >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
    );
}
