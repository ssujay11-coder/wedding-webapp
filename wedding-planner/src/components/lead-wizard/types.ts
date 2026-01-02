export interface LeadData {
    weddingDate: Date | undefined;
    guestCount: string;
    budgetRange: number; // 0-100 scale or specific brackets
    stylePreferences: string[];
    name: string;
    email: string;
    phone: string;
}

export type WizardStep = 'intro' | 'date-guests' | 'budget' | 'style' | 'contact' | 'completed';
