'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CheckCircle, Star, Sparkles } from "lucide-react";
import { useTranslate } from "@/locales";

interface BillingToggleProps {
    label: string;
    active: boolean;
    onClick: () => void;
    badge?: string | null;
}

export function BillingToggle({ label, active, onClick, badge = null }: BillingToggleProps) {
    return (
        <Button
            className={`px-12 py-6 text-sm font-medium relative rounded-xl transition-all duration-300 ${active
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-200/40 hover:shadow-xl hover:shadow-purple-200/60 hover:-translate-y-0.5"
                : "text-gray-600 bg-transparent hover:bg-gray-50 hover:text-gray-800"
                }`}
            onClick={onClick}
        >
            {label}
            {badge && (
                <span className="absolute -top-2 -right-2 text-xs bg-gradient-to-r from-green-400 to-emerald-400 text-white px-1 py-1 rounded-full font-medium shadow-sm animate-pulse">
                    {badge}
                </span>
            )}
        </Button>
    );
}


export type BillingPeriod = "monthly" | "annual";

interface PricingCardProps {
    name: string;
    price: string;
    credits: string;
    features: string[];
    highlighted?: boolean;
    billingPeriod: BillingPeriod | "onetime";
    customerType: string;
    isOneTime?: boolean;
    planId?: string;
}



export function PricingCard({ name, price, credits, features, highlighted = false, billingPeriod, customerType, isOneTime = false, planId }: PricingCardProps) {
    const { t } = useTranslate('home');

    const getPeriodText = () => {
        if (isOneTime) return t('pricingOneTimeLabel');
        switch (billingPeriod) {
            case "monthly": return t('pricingMonthlyLabel');
            case "annual": return t('pricingAnnualLabel');
            default: return t('pricingMonthlyLabel');
        }
    };

    const buttonText = customerType === "individual"
        ? t('pricingIndividualOneTimeButton')
        : t('pricingCorporateOneTimeButton');

    const handlePlanSelect = () => {
        console.log('Selected plan:', planId);
    };

    return (
        <Card className={`overflow-hidden group transition-all duration-500 hover:-translate-y-2 relative h-full ${highlighted
            ? "border-2 border-purple-300 bg-gradient-to-br from-white to-purple-50/50 shadow-xl shadow-purple-100/50 hover:shadow-2xl hover:shadow-purple-200/60"
            : "border border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-gray-200/40"
            }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {highlighted && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            )}

            {highlighted && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 text-xs font-bold rounded-bl-lg flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {t('pricingRecommendedBadge')}
                </div>
            )}

            <CardHeader className="pb-4 relative z-10">
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2 mt-2 group-hover:text-purple-600 transition-colors duration-300">
                        {name}
                    </h3>
                </div>
            </CardHeader>

            <CardContent className="text-center pt-0 relative z-10">
                <div className="mb-6">
                    <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500">
                        {price}
                    </div>
                    <p className="text-gray-500 text-sm mb-4">{getPeriodText()}</p>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 rounded-full px-6 py-2 text-sm font-medium border border-purple-200/60">
                        <Sparkles className="w-4 h-4" />
                        {credits}
                    </div>
                </div>

                <Button
                    onClick={handlePlanSelect}
                    className={`w-full py-4 rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5 ${highlighted
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-200/40 hover:shadow-xl hover:shadow-purple-200/60"
                        : "bg-gray-900 hover:bg-gray-800 text-white shadow-lg shadow-gray-200/40 hover:shadow-xl hover:shadow-gray-200/60"
                        }`}
                >
                    {buttonText}
                </Button>
            </CardContent>

            <CardFooter className="flex flex-col pt-6 relative z-10">
                <div className="text-sm text-gray-600 mb-6 text-center font-medium flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {t('pricingFeaturesLabel')}
                </div>
                <ul className="space-y-4 w-full">
                    {features.map((feature, index) => (
                        <li
                            key={index}
                            className="flex items-start gap-3 text-sm group-hover:text-gray-700 transition-colors duration-300"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="relative flex-shrink-0 mt-0.5">
                                <CheckCircle className="w-5 h-5 text-green-500 group-hover:text-green-600 transition-colors duration-300" />
                                <div className="absolute inset-0 bg-green-200/40 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            </div>
                            <span className="leading-relaxed">{t(feature)}</span>
                        </li>
                    ))}
                </ul>
            </CardFooter>
        </Card>
    );
}