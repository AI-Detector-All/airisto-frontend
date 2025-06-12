'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CheckCircle, Building2, User } from "lucide-react";
import { useTranslate } from "@/locales";

type BillingPeriod = "onetime" | "monthly" | "annual";

interface HomePricingProps {
    activePlansType?: string
}

export function HomePricing({ activePlansType }: HomePricingProps) {
    const { t } = useTranslate('home');
    const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
    const [customerType, setCustomerType] = useState(activePlansType ? activePlansType : "individual");

    const individualPlans = {
        onetime: {
            name: t('pricingIndividualOneTimeName'),
            price: t('pricingIndividualOneTimePrice'),
            credits: t('pricingIndividualOneTimeCredits'),
            highlighted: false,
            features: [
                t('pricingIndividualOneTimeFeature1'),
                t('pricingIndividualOneTimeFeature2'),
                t('pricingIndividualOneTimeFeature3'),
                t('pricingIndividualOneTimeFeature4'),
                t('pricingIndividualOneTimeFeature5'),
            ]
        },
        monthly: {
            name: t('pricingIndividualMonthlyName'),
            price: t('pricingIndividualMonthlyPrice'),
            credits: t('pricingIndividualMonthlyCredits'),
            highlighted: true,
            features: [
                t('pricingIndividualMonthlyFeature1'),
                t('pricingIndividualMonthlyFeature2'),
                t('pricingIndividualMonthlyFeature3'),
                t('pricingIndividualMonthlyFeature4'),
                t('pricingIndividualMonthlyFeature5'),
                t('pricingIndividualMonthlyFeature6'),
                t('pricingIndividualMonthlyFeature7'),
            ]
        },
        annual: {
            name: t('pricingIndividualAnnualName'),
            price: t('pricingIndividualAnnualPrice'),
            credits: t('pricingIndividualAnnualCredits'),
            highlighted: true,
            features: [
                t('pricingIndividualAnnualFeature1'),
                t('pricingIndividualAnnualFeature2'),
                t('pricingIndividualAnnualFeature3'),
                t('pricingIndividualAnnualFeature4'),
                t('pricingIndividualAnnualFeature5'),
                t('pricingIndividualAnnualFeature6'),
                t('pricingIndividualAnnualFeature7'),
            ]
        }
    };

    const corporatePlans = {
        onetime: {
            name: t('pricingCorporateOneTimeName'),
            price: t('pricingCorporateOneTimePrice'),
            credits: t('pricingCorporateOneTimeCredits'),
            highlighted: false,
            features: [
                t('pricingCorporateOneTimeFeature1'),
                t('pricingCorporateOneTimeFeature2'),
                t('pricingCorporateOneTimeFeature3'),
                t('pricingCorporateOneTimeFeature4'),
                t('pricingCorporateOneTimeFeature5'),
                t('pricingCorporateOneTimeFeature6'),
            ]
        },
        monthly: {
            name: t('pricingCorporateMonthlyName'),
            price: t('pricingCorporateMonthlyPrice'),
            credits: t('pricingCorporateMonthlyCredits'),
            highlighted: true,
            features: [
                t('pricingCorporateMonthlyFeature1'),
                t('pricingCorporateMonthlyFeature2'),
                t('pricingCorporateMonthlyFeature3'),
                t('pricingCorporateMonthlyFeature4'),
                t('pricingCorporateMonthlyFeature5'),
                t('pricingCorporateMonthlyFeature6'),
                t('pricingCorporateMonthlyFeature7'),
            ]
        },
        annual: {
            name: t('pricingCorporateAnnualName'),
            price: t('pricingCorporateAnnualPrice'),
            credits: t('pricingCorporateAnnualCredits'),
            highlighted: true,
            features: [
                t('pricingCorporateAnnualFeature1'),
                t('pricingCorporateAnnualFeature2'),
                t('pricingCorporateAnnualFeature3'),
                t('pricingCorporateAnnualFeature4'),
                t('pricingCorporateAnnualFeature5'),
                t('pricingCorporateAnnualFeature6'),
                t('pricingCorporateAnnualFeature7'),
                t('pricingCorporateAnnualFeature8'),
            ]
        }
    };

    const activePlans = customerType === "individual" ?
        [individualPlans[billingPeriod]] :
        [corporatePlans[billingPeriod]];

    return (
        <div id="pricing" className="w-full font-onest py-8 mt-16 flex flex-col min-h-screen justify-center items-center">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4 font-onest">{t('pricingTitle')}</h2>
                <p className="text-gray-600 max-w-2xl mx-auto font-onest">
                    {t('pricingSubtitle')}
                </p>
            </div>

            {/* Customer Type Toggle */}
            <div className="flex justify-center mb-8">
                <div className="inline-flex p-1 rounded-xl bg-gray-100 gap-4">
                    {activePlansType === "corporate" ? (
                        <>
                            <Button
                                className={`px-8 py-6 flex items-center gap-2 ${customerType === "corporate"
                                    ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white"
                                    : "text-gray-900 border border-gray-300 bg-transparent hover:bg-transparent"}`}
                                onClick={() => setCustomerType("corporate")}
                            >
                                <Building2 size={18} />
                                {t('pricingCorporateLabel')}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                className={`px-8 py-6 flex items-center gap-2 ${customerType === "individual"
                                    ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white"
                                    : "text-gray-900 border border-gray-300 bg-transparent hover:bg-transparent"}`}
                                onClick={() => setCustomerType("individual")}
                            >
                                <User size={18} />
                                {t('pricingIndividualLabel')}
                            </Button>
                            <Button
                                className={`px-8 py-6 flex items-center gap-2 ${customerType === "corporate"
                                    ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white"
                                    : "text-gray-900 border border-gray-300 bg-transparent hover:bg-transparent"}`}
                                onClick={() => setCustomerType("corporate")}
                            >
                                <Building2 size={18} />
                                {t('pricingCorporateLabel')}
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* Billing Period Toggle */}
            <div className="flex justify-center mb-8 ">
                <div className="inline-flex p-1 rounded-xl bg-gray-100 gap-4">
                    <BillingToggle
                        label={t('pricingOneTimeLabel')}
                        active={billingPeriod === "onetime"}
                        onClick={() => setBillingPeriod("onetime")}
                        gradient
                    />
                    <BillingToggle
                        label={t('pricingMonthlyLabel')}
                        active={billingPeriod === "monthly"}
                        onClick={() => setBillingPeriod("monthly")}
                        gradient
                    />
                    <BillingToggle
                        label={t('pricingAnnualLabel')}
                        badge={t('pricingSavingsBadge')}
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
    const { t } = useTranslate('home');

    const getPeriodText = () => {
        switch (billingPeriod) {
            case "onetime": return t('pricingOneTimeLabel');
            case "monthly": return t('pricingMonthlyLabel');
            case "annual": return t('pricingAnnualLabel');
            default: return t('pricingMonthlyLabel');
        }
    };

    const buttonText = customerType === "individual" 
        ? t('pricingIndividualOneTimeButton') 
        : t('pricingCorporateOneTimeButton');

    return (
        <Card className={`overflow-hidden ${highlighted
            ? "border-purple-500 border-2 relative"
            : "border-gray-200"
            }`}>
            {highlighted && (
                <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 text-xs font-medium">
                    {t('pricingRecommendedBadge')}
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
                <div className="text-sm text-gray-600 mb-4 text-center">{t('pricingFeaturesLabel')}</div>
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