'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building2, User, ArrowRight, Phone, Mail, Users, Zap, Shield, Sparkles } from "lucide-react";
import { useTranslate } from "@/locales";
import Link from "next/link";
import { Subscription } from "@/types/subscription";
import { getSubscriptions } from "@/services/subscription";
import { BillingPeriod, BillingToggle, PricingCard } from "@/components/pricing-card";

interface HomePricingProps {
    activePlansType?: string
}

export function HomePricing({ activePlansType }: HomePricingProps) {
    const { t } = useTranslate('home');
    const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
    const [customerType, setCustomerType] = useState(activePlansType ? activePlansType.toLocaleLowerCase() : "individual");
    const [subscriptionPlans, setSubscriptionPlans] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubscriptionPlans = async () => {
            try {
                const response = await getSubscriptions();
                setSubscriptionPlans(response);
            } catch (error) {
                console.error('Error fetching subscription plans:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptionPlans();
    }, []);

    const getIndividualPlans = () => {
        const onetimePlan = subscriptionPlans.find(plan => plan.type === 'ONETIME');
        const monthlyPlan = subscriptionPlans.find(plan => 
            plan.type === 'MONTHLY' && 
            !plan.name.toLowerCase().includes('kurumsal')
        );
        const yearlyPlan = subscriptionPlans.find(plan => 
            (plan.type === 'YEARLY' || plan.type === 'MONTHLY') && 
            plan.name.toLowerCase().includes('yıllık') &&
            !plan.name.toLowerCase().includes('kurumsal')
        );

        return {
            onetime: onetimePlan ? {
                name: onetimePlan.name,
                price: onetimePlan.price,
                credits: `${onetimePlan.maxAnalyses} ${t('pricingCreditsLabel') || 'analiz'}`,
                highlighted: false,
                features: onetimePlan.features,
                planId: onetimePlan.id
            } : null,
            monthly: monthlyPlan ? {
                name: monthlyPlan.name,
                price: monthlyPlan.price,
                credits: `${monthlyPlan.maxAnalyses} ${t('pricingCreditsLabel') || 'analiz'}`,
                highlighted: true,
                features: monthlyPlan.features,
                planId: monthlyPlan.id
            } : null,
            annual: yearlyPlan ? {
                name: yearlyPlan.name,
                price: yearlyPlan.price,
                credits: `${yearlyPlan.maxAnalyses} ${t('pricingCreditsLabel') || 'analiz'}`,
                highlighted: true,
                features: yearlyPlan.features,
                planId: yearlyPlan.id
            } : null
        };
    };

    const getCorporatePlans = () => {
        const monthlyPlan = subscriptionPlans.find(plan => 
            plan.type === 'MONTHLY' && 
            plan.name.toLowerCase().includes('kurumsal')
        );
        const yearlyPlan = subscriptionPlans.find(plan => 
            plan.type === 'YEARLY' && 
            plan.name.toLowerCase().includes('kurumsal')
        );

        return {
            monthly: monthlyPlan ? {
                name: monthlyPlan.name,
                price: monthlyPlan.price,
                credits: `${monthlyPlan.maxAnalyses} ${t('pricingCreditsLabel') || 'analiz'}`,
                highlighted: true,
                features: monthlyPlan.features,
                planId: monthlyPlan.id
            } : null,
            annual: yearlyPlan ? {
                name: yearlyPlan.name,
                price: yearlyPlan.price,
                credits: `${yearlyPlan.maxAnalyses} ${t('pricingCreditsLabel') || 'analiz'}`,
                highlighted: true,
                features: yearlyPlan.features,
                planId: yearlyPlan.id
            } : null
        };
    };

    const getActivePlans = () => {
        if (customerType === "individual") {
            const individualPlans = getIndividualPlans();
            const plans = [];
            
            if (individualPlans.onetime) {
                plans.push(individualPlans.onetime);
            }
            
            if (billingPeriod === "monthly" && individualPlans.monthly) {
                plans.push(individualPlans.monthly);
            } else if (billingPeriod === "annual" && individualPlans.annual) {
                plans.push(individualPlans.annual);
            }
            
            return plans;
        } else {
            const corporatePlans = getCorporatePlans();
            const plans = [];
            
            if (billingPeriod === "monthly" && corporatePlans.monthly) {
                plans.push(corporatePlans.monthly);
            } else if (billingPeriod === "annual" && corporatePlans.annual) {
                plans.push(corporatePlans.annual);
            }
            
            return plans;
        }
    };

    const activePlans = getActivePlans();

    if (loading) {
        return (
            <div className="w-full font-onest py-16 flex flex-col min-h-screen justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                <p className="mt-4 text-gray-600">Planlar yükleniyor...</p>
            </div>
        );
    }

    return (
        <div id="pricing" className="w-full font-onest py-8 flex flex-col min-h-screen justify-center items-center relative overflow-hidden">
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

            <div className="flex justify-center mb-4 ">
                <div className="inline-flex p-2 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-lg shadow-gray-200/40">
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
                <div className="max-w-5xl mx-auto mb-12 animate-in slide-in-from-bottom duration-700 delay-100">
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
                <div className="flex justify-center mb-12">
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
                        key={plan.planId || index}
                        className="animate-in slide-in-from-bottom duration-700"
                        style={{ animationDelay: `${(index + 4) * 50}ms` }}
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
                                planId={plan.planId}
                            />
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
}


