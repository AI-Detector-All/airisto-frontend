'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export function HomePricing() {
    const [billingPeriod, setBillingPeriod] = useState("monthly");

    const plans = {
        standard: {
            name: "Standart Plan",
            monthly: "$29.99",
            annual: "$299.99",
            lifetime: "$799.99",
            prepaid: "$349.99",
            features: [
                "Günde 50 sayfaya kadar analiz etme",
                "Yapay Zeka Dedektörü v2.0",
                "Temel Tespit Özelliklerine Erişim",
                "Metin Tespit Araçlarına Erişim",
                "Günde 50 Belge Yükleme",
                "Temel Raporlar ve Analizler",
                "E-Posta Desteği"
            ]
        },
        premium: {
            name: "Premium Plan",
            monthly: "$49.99",
            annual: "$499.99",
            lifetime: "$1299.99",
            prepaid: "$599.99",
            highlighted: true,
            features: [
                "Sınırsız metin analizi",
                "Yapay Zeka Dedektörü v2.0",
                "Tüm Tespit Özelliklerine Erişim",
                "Tüm Tespit Araçlarına Erişim",
                "Detaylı Analiz Panosu",
                "Premium Destek",
                "Sınırsız Kelime",
                "Sınırsız Belge Yükleme",
                "Toplu İşlem"
            ]
        }
    };
    type BillingPeriod = 'monthly' | 'annual' | 'lifetime' | 'prepaid';
    return (
        <div id="pricing" className="w-full font-onest py-12 mt-16">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4 font-onest">Choose Your Detection Plan</h2>
                <p className="text-gray-600 max-w-2xl mx-auto font-onest">
                    İçerik doğrulama ihtiyaçlarınıza en uygun planı seçin
                </p>
            </div>

            <div className="flex justify-center mb-8 mt-16">
                <div className="inline-flex p-1 rounded-xl bg-gray-100 gap-4">
                    <BillingToggle
                        label="Aylık"
                        active={billingPeriod === "monthly"}
                        onClick={() => setBillingPeriod("monthly")}
                        gradient
                    />
                    <BillingToggle
                        label="Yıllık"
                        badge="Save 30%"
                        active={billingPeriod === "annual"}
                        onClick={() => setBillingPeriod("annual")}
                        gradient
                    />
                    {/* <BillingToggle
                        label="Lifetime"
                        active={billingPeriod === "lifetime"}
                        onClick={() => setBillingPeriod("lifetime")}
                    />
                    <BillingToggle
                        label="Pre-Paid"
                        active={billingPeriod === "prepaid"}
                        onClick={() => setBillingPeriod("prepaid")}
                    /> */}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {Object.entries(plans).map(([key, plan]) => (
                    <PricingCard
                        key={key}
                        name={plan.name}
                        price={plan[billingPeriod as BillingPeriod]}
                        features={plan.features}
                        highlighted={('highlighted' in plan) ? plan.highlighted : false}
                        billingPeriod={billingPeriod}
                    />
                ))}
            </div>
        </div>
    );
}

interface BillingToggleProps {
    label: string;
    active: boolean;
    onClick: () => void;
    gradient?: boolean;
    badge?: string | null;
}

function BillingToggle({ label, active, onClick, gradient = false, badge = null }: BillingToggleProps) {
    return (
        <Button
            className={`px-10 py-6 text-sm font-medium relative ${active
                    ? gradient
                        ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white"
                        : "bg-white text-gray-900"
                    : "text-gray-900 border border-gray-300 bg-transparent hover:bg-transparent"
                } rounded-lg transition-colors`}
            onClick={onClick}
        >
            {label}
            {badge && (
                <span className="absolute -top-1 -right-1 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                    {badge}
                </span>
            )}
        </Button>
    );
}

interface PricingCardProps {
    name: string;
    price: string;
    features: string[];
    highlighted?: boolean;
    billingPeriod: string;
}

function PricingCard({ name, price, features, highlighted = false, billingPeriod }: PricingCardProps) {
    const getPeriodText = () => {
        switch (billingPeriod) {
            case "monthly": return "Aylık";
            case "annual": return "Yıllık";
            case "lifetime": return "One Time";
            case "prepaid": return "For 12 Months";
            default: return "Aylık";
        }
    };

    return (
        <Card className={`overflow-hidden ${highlighted
                ? "border-purple-500 border-2 relative"
                : "border-gray-200"
            }`}>
            <CardHeader className="pb-0">
                <h3 className="text-xl font-medium text-center">{name}</h3>
            </CardHeader>

            <CardContent className="text-center pt-4">
                <div className="text-5xl font-bold mb-1">{price}</div>
                <p className="text-gray-500 text-sm">{getPeriodText()}</p>

                <Button
                    className={`w-full mt-6 py-6 ${highlighted
                            ? "bg-purple-600 hover:bg-purple-700 text-white"
                            : "bg-slate-900 hover:bg-slate-800 text-white"
                        }`}
                >
                    Plan Seç
                </Button>
            </CardContent>

            <CardFooter className="flex flex-col pt-0">
                <div className="text-sm text-gray-600 mb-4 text-center">İçerik</div>
                <ul className="space-y-3">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardFooter>
        </Card>
    );
}