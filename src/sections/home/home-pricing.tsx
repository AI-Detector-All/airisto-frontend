'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CheckCircle, Building2, User } from "lucide-react";

type BillingPeriod = "onetime" | "monthly" | "annual";

export function HomePricing() {
    const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
    const [customerType, setCustomerType] = useState("individual");

    const individualPlans = {
        onetime: {
            name: "Tek Seferlik Analiz",
            price: "₺249",
            credits: "20 sayfa analizi",
            highlighted: false,
            features: [
                "Yapay Zeka İçerik Dedektörü",
                "Temel Tespit Özelliklerine Erişim",
                "Metin Tespit Araçları",
                "Belge Yükleme",
                "Temel Raporlar",
                "E-Posta Desteği"
            ]
        },
        monthly: {
            name: "Aylık Abonelik",
            price: "₺399",
            credits: "100 sayfa/ay",
            highlighted: true,
            features: [
                "Gelişmiş Yapay Zeka İçerik Dedektörü",
                "Tüm Tespit Özelliklerine Erişim",
                "Tüm Tespit Araçlarına Erişim",
                "Detaylı Analiz Panosu",
                "Öncelikli Destek",
                "Toplu İşlem",
                "Gelişmiş Raporlama"
            ]
        },
        annual: {
            name: "Yıllık Abonelik",
            price: "₺3990",
            credits: "1200 sayfa/yıl",
            highlighted: true,
            features: [
                "Gelişmiş Yapay Zeka İçerik Dedektörü",
                "Tüm Tespit Özelliklerine Erişim",
                "Tüm Tespit Araçlarına Erişim",
                "Detaylı Analiz Panosu",
                "Öncelikli Destek",
                "Toplu İşlem",
                "Gelişmiş Raporlama"
            ]
        }
    };

    const corporatePlans = {
        onetime: {
            name: "Kurumsal Tek Seferlik",
            price: "₺1499",
            credits: "200 sayfa analizi",
            highlighted: false,
            features: [
                "Kurumsal Yapay Zeka Dedektörü",
                "5 Kullanıcı Erişimi",
                "Tüm Tespit Özelliklerine Erişim",
                "Kurumsal Raporlama",
                "Öncelikli Destek",
                "Toplu İşlem"
            ]
        },
        monthly: {
            name: "Kurumsal Aylık",
            price: "₺2999",
            credits: "1000 sayfa/ay",
            highlighted: true,
            features: [
                "Gelişmiş Kurumsal Yapay Zeka Dedektörü",
                "Sınırsız Kullanıcı",
                "Tüm Gelişmiş Tespit Özellikleri",
                "Özelleştirilebilir Raporlama",
                "Özel Müşteri Temsilcisi",
                "API Erişimi",
                "7/24 Teknik Destek"
            ]
        },
        annual: {
            name: "Kurumsal Yıllık",
            price: "₺29990",
            credits: "Sınırsız analiz",
            highlighted: true,
            features: [
                "Gelişmiş Kurumsal Yapay Zeka Dedektörü",
                "Sınırsız Kullanıcı",
                "Tüm Gelişmiş Tespit Özellikleri",
                "Özelleştirilebilir Raporlama",
                "Özel Müşteri Temsilcisi",
                "Gelişmiş API Erişimi",
                "Özelleştirilebilir Entegrasyonlar",
                "7/24 Öncelikli Teknik Destek"
            ]
        }
    };

    const activePlans = customerType === "individual" ? 
        [individualPlans[billingPeriod]] : 
        [corporatePlans[billingPeriod]];

    return (
        <div id="pricing" className="w-full font-onest py-8 mt-16 flex flex-col min-h-screen justify-center items-center">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4 font-onest">İhtiyacınıza Uygun Planı Seçin</h2>
                <p className="text-gray-600 max-w-2xl mx-auto font-onest">
                    İçerik doğrulama ihtiyaçlarınıza en uygun planı seçin
                </p>
            </div>

            {/* Customer Type Toggle */}
            <div className="flex justify-center mb-8">
                <div className="inline-flex p-1 rounded-xl bg-gray-100 gap-4">
                    <Button
                        className={`px-8 py-6 flex items-center gap-2 ${customerType === "individual" 
                            ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white" 
                            : "text-gray-900 border border-gray-300 bg-transparent hover:bg-transparent"}`}
                        onClick={() => setCustomerType("individual")}
                    >
                        <User size={18} />
                        Bireysel
                    </Button>
                    <Button
                        className={`px-8 py-6 flex items-center gap-2 ${customerType === "corporate" 
                            ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white" 
                            : "text-gray-900 border border-gray-300 bg-transparent hover:bg-transparent"}`}
                        onClick={() => setCustomerType("corporate")}
                    >
                        <Building2 size={18} />
                        Kurumsal
                    </Button>
                </div>
            </div>

            {/* Billing Period Toggle */}
            <div className="flex justify-center mb-8 ">
                <div className="inline-flex p-1 rounded-xl bg-gray-100 gap-4">
                    <BillingToggle
                        label="Tek Seferlik"
                        active={billingPeriod === "onetime"}
                        onClick={() => setBillingPeriod("onetime")}
                        gradient
                    />
                    <BillingToggle
                        label="Aylık"
                        active={billingPeriod === "monthly"}
                        onClick={() => setBillingPeriod("monthly")}
                        gradient
                    />
                    <BillingToggle
                        label="Yıllık"
                        badge="Tasarruf"
                        active={billingPeriod === "annual"}
                        onClick={() => setBillingPeriod("annual")}
                        gradient
                    />
                </div>
            </div>

            <div className="max-w-lg mx-auto">
                {activePlans.map((plan, index) => (
                    <PricingCard
                        key={index}
                        name={plan.name}
                        price={plan.price}
                        credits={plan.credits}
                        features={plan.features}
                        highlighted={plan.highlighted}
                        billingPeriod={billingPeriod}
                        customerType={customerType}
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
            className={`px-8 py-6 text-sm font-medium relative ${active
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
    credits: string;
    features: string[];
    highlighted?: boolean;
    billingPeriod: BillingPeriod;
    customerType: string;
}

function PricingCard({ name, price, credits, features, highlighted = false, billingPeriod, customerType }: PricingCardProps) {
    const getPeriodText = () => {
        switch (billingPeriod) {
            case "onetime": return "Tek Seferlik";
            case "monthly": return "Aylık";
            case "annual": return "Yıllık";
            default: return "Aylık";
        }
    };
    
    const buttonText = customerType === "individual" ? "Satın Al" : "İletişime Geç";

    return (
        <Card className={`overflow-hidden ${highlighted
                ? "border-purple-500 border-2 relative"
                : "border-gray-200"
            }`}>
            {highlighted && (
                <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 text-xs font-medium">
                    Önerilen
                </div>
            )}
            <CardHeader className="pb-0">
                <h3 className="text-xl font-medium text-center">{name}</h3>
            </CardHeader>

            <CardContent className="text-center pt-4">
                <div className="text-4xl font-bold mb-1">{price}</div>
                <p className="text-gray-500 text-sm mb-2">{getPeriodText()}</p>
                <div className="bg-purple-50 text-purple-700 rounded-full px-4 py-1 text-sm font-medium inline-block">
                    {credits}
                </div>

                <Button
                    className={`w-full mt-6 py-6 ${highlighted
                            ? "bg-purple-600 hover:bg-purple-700 text-white"
                            : "bg-slate-900 hover:bg-slate-800 text-white"
                        }`}
                >
                    {buttonText}
                </Button>
            </CardContent>

            <CardFooter className="flex flex-col pt-0">
                <div className="text-sm text-gray-600 mb-4 text-center">Özellikler</div>
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