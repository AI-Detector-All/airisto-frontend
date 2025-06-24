'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CheckCircle, Building2, User, ArrowRight, Phone, Mail, Users, Zap, Shield, Star, Sparkles } from "lucide-react";
import { useTranslate } from "@/locales";
import Link from "next/link";

type BillingPeriod = "monthly" | "annual";

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
                t('pricingIndividualMonthlyFeature1'),
                t('pricingIndividualMonthlyFeature2'),
                t('pricingIndividualMonthlyFeature3'),
                t('pricingIndividualMonthlyFeature4'),
                t('pricingIndividualMonthlyFeature5'),
                t('pricingIndividualMonthlyFeature6'),
                t('pricingIndividualMonthlyFeature7'),
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
                t('pricingIndividualMonthlyFeature8'),
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
                t('pricingIndividualAnnualFeature8'),
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

    const getActivePlans = () => {
        if (customerType === "individual") {
            return [individualPlans.onetime, individualPlans[billingPeriod]];
        }
        return [corporatePlans[billingPeriod]];
    };

    const activePlans = getActivePlans();

    return (
        <div id="pricing" className="w-full font-onest py-16 flex flex-col min-h-screen justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-purple-50/30 pointer-events-none" />
            <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="text-center mb-4 relative z-10 animate-in fade-in duration-1000">
                <div className="inline-flex items-center justify-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 mb-6">
                    <Sparkles className="w-4 h-4 text-purple-500 mr-2" />
                    <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {t('pricingPlans')}
                    </span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-[1.2] py-1">
                    {t('pricingTitle')}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    {t('pricingSubtitle')}
                </p>
            </div>

            <div className="flex justify-center mb-4 animate-in slide-in-from-bottom duration-700 delay-200">
                <div className="inline-flex p-1.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-lg shadow-gray-200/40">
                    {activePlansType === "corporate" ? (
                        <Button
                            className="px-8 py-4 flex items-center gap-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl shadow-lg shadow-purple-200/40 hover:shadow-xl hover:shadow-purple-200/60 transition-all duration-300 hover:-translate-y-0.5"
                            onClick={() => setCustomerType("corporate")}
                        >
                            <Building2 size={20} />
                            <span className="font-medium">{t('pricingCorporateLabel')}</span>
                        </Button>
                    ) : (
                        <div className="flex gap-1">
                            <Button
                                className={`px-8 py-4 flex items-center gap-3 rounded-xl transition-all duration-300 ${customerType === "individual"
                                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-200/40 hover:shadow-xl hover:shadow-purple-200/60 hover:-translate-y-0.5"
                                    : "text-gray-600 bg-transparent hover:bg-gray-50 hover:text-gray-800"
                                    }`}
                                onClick={() => setCustomerType("individual")}
                            >
                                <User size={20} />
                                <span className="font-medium">{t('pricingIndividualLabel')}</span>
                            </Button>
                            <Button
                                className={`px-8 py-4 flex items-center gap-3 rounded-xl transition-all duration-300 ${customerType === "corporate"
                                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-200/40 hover:shadow-xl hover:shadow-purple-200/60 hover:-translate-y-0.5"
                                    : "text-gray-600 bg-transparent hover:bg-gray-50 hover:text-gray-800"
                                    }`}
                                onClick={() => setCustomerType("corporate")}
                            >
                                <Building2 size={20} />
                                <span className="font-medium">{t('pricingCorporateLabel')}</span>
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {customerType === "corporate" && (
                <div className="max-w-5xl mx-auto mb-12 animate-in slide-in-from-bottom duration-700 delay-300">
                    <Card className="border-2 border-purple-200/60 bg-gradient-to-br from-white to-purple-50/30 backdrop-blur-sm shadow-xl shadow-purple-100/40 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

                        <CardHeader className="text-center pb-6 relative">
                            <div className="flex justify-center mb-6">
                                <div className="relative p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl">
                                    <Building2 className="w-10 h-10 text-purple-600" />
                                    <div className="absolute inset-0 bg-purple-200/40 rounded-2xl scale-0 animate-ping" style={{ animationDelay: '2s' }} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
                                {t('corporatePricingTitle')}
                            </h3>
                            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                                {t('corporatePricingDesc')}
                            </p>
                        </CardHeader>

                        <CardContent className="relative">
                            <div className="grid md:grid-cols-3 gap-8 mb-10">
                                {[
                                    { icon: Users, title: t('corporatePricingUsersTitle'), desc: t('corporatePricingUsersDesc') },
                                    { icon: Zap, title: t('corporatePricingSupport'), desc: t('corporatePricingSupportDesc') },
                                    { icon: Shield, title: t('corporatePricingSecurity'), desc: t('corporatePricingSecurityDesc') }
                                ].map((item, index) => (
                                    <div key={index} className="text-center p-6 group">
                                        <div className="relative p-4 bg-white rounded-2xl shadow-sm mb-4 inline-block group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                                            <item.icon className="w-8 h-8 text-purple-600 group-hover:text-blue-600 transition-colors duration-300" />
                                        </div>
                                        <h4 className="font-bold text-gray-800 mb-3 text-lg">{item.title}</h4>
                                        <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-200/60 shadow-lg">
                                <div className="text-center mb-8">
                                    <h4 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
                                        {t('offer')}
                                    </h4>
                                    <p className="text-gray-600 text-lg">{t('offerDesc')}</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                    <Link href="/contact">
                                        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 rounded-xl flex items-center gap-3 group shadow-lg shadow-purple-200/40 hover:shadow-xl hover:shadow-purple-200/60 transition-all duration-300 hover:-translate-y-1">
                                            <Mail className="w-5 h-5" />
                                            <span className="font-medium">{t('contact')}</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                        </Button>
                                    </Link>

                                    <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-600">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                                            <Phone className="w-4 h-4 text-purple-500" />
                                            <span className="font-medium">+90 (212) 555 0123</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                                            <Mail className="w-4 h-4 text-purple-500" />
                                            <span className="font-medium">ainonceai@gmail.com</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {customerType === "individual" && (
                <div className="flex justify-center mb-12 animate-in slide-in-from-bottom duration-700 delay-300">
                    <div className="inline-flex p-1.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-lg shadow-gray-200/40">
                        <BillingToggle
                            label={t('pricingMonthlyLabel')}
                            active={billingPeriod === "monthly"}
                            onClick={() => setBillingPeriod("monthly")}
                        />
                        <BillingToggle
                            label={t('pricingAnnualLabel')}
                            badge={t('pricingSavingsBadge')}
                            active={billingPeriod === "annual"}
                            onClick={() => setBillingPeriod("annual")}
                        />
                    </div>
                </div>
            )}

            <div className={`${customerType === "individual" ? "max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8" : "max-w-lg"} mx-auto`}>
                {activePlans.map((plan, index) => (
                    <div
                        key={index}
                        className="animate-in slide-in-from-bottom duration-700"
                        style={{ animationDelay: `${(index + 4) * 150}ms` }}
                    >
                        {customerType === "individual" && (
                            <PricingCard
                                name={plan.name}
                                price={plan.price}
                                credits={plan.credits}
                                features={plan.features}
                                highlighted={plan.highlighted}
                                billingPeriod={customerType === "individual" && index === 0 ? "onetime" : billingPeriod}
                                customerType={customerType}
                                isOneTime={customerType === "individual" && index === 0}
                            />
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
}

interface BillingToggleProps {
    label: string;
    active: boolean;
    onClick: () => void;
    badge?: string | null;
}

function BillingToggle({ label, active, onClick, badge = null }: BillingToggleProps) {
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

interface PricingCardProps {
    name: string;
    price: string;
    credits: string;
    features: string[];
    highlighted?: boolean;
    billingPeriod: BillingPeriod | "onetime";
    customerType: string;
    isOneTime?: boolean;
}

function PricingCard({ name, price, credits, features, highlighted = false, billingPeriod, customerType, isOneTime = false }: PricingCardProps) {
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
                            <span className="leading-relaxed">{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardFooter>
        </Card>
    );
}