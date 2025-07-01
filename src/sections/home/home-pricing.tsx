'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building2, User, ArrowRight, Phone, Mail, Users, Zap, Shield } from "lucide-react";
import { useTranslate } from "@/locales";
import Link from "next/link";
import { Subscription } from "@/types/subscription";
import { getSubscriptions } from "@/services/subscription";
import { BillingPeriod, PricingCard } from "@/components/pricing-card";

interface HomePricingProps {
    activePlansType?: string
}

export function HomePricing({ activePlansType }: HomePricingProps) {
    const { t } = useTranslate('home');
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

    const getAllIndividualPlans = () => {
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

        const plans = [];
        
        if (onetimePlan) {
            plans.push({
                name: onetimePlan.name,
                price: onetimePlan.price,
                credits: `${onetimePlan.maxAnalyses} ${t('pricingCreditsLabel') || 'analiz'}`,
                highlighted: false,
                features: onetimePlan.features,
                planId: onetimePlan.id,
                billingType: 'onetime'
            });
        }
        
        if (monthlyPlan) {
            plans.push({
                name: monthlyPlan.name,
                price: monthlyPlan.price,
                credits: `${monthlyPlan.maxAnalyses} ${t('pricingCreditsLabel') || 'analiz'}`,
                highlighted: false,
                features: monthlyPlan.features,
                planId: monthlyPlan.id,
                billingType: 'monthly'
            });
        }
        
        if (yearlyPlan) {
            plans.push({
                name: yearlyPlan.name,
                price: yearlyPlan.price,
                credits: `${yearlyPlan.maxAnalyses} ${t('pricingCreditsLabel') || 'analiz'}`,
                highlighted: true,
                features: yearlyPlan.features,
                planId: yearlyPlan.id,
                billingType: 'annual'
            });
        }
        
        return plans;
    };

    // const getCorporatePlans = () => {
    //     const monthlyPlan = subscriptionPlans.find(plan => 
    //         plan.type === 'MONTHLY' && 
    //         plan.name.toLowerCase().includes('kurumsal')
    //     );
    //     const yearlyPlan = subscriptionPlans.find(plan => 
    //         plan.type === 'YEARLY' && 
    //         plan.name.toLowerCase().includes('kurumsal')
    //     );

    //     return {
    //         monthly: monthlyPlan ? {
    //             name: monthlyPlan.name,
    //             price: monthlyPlan.price,
    //             credits: `${monthlyPlan.maxAnalyses} ${t('pricingCreditsLabel') || 'analiz'}`,
    //             highlighted: true,
    //             features: monthlyPlan.features,
    //             planId: monthlyPlan.id
    //         } : null,
    //         annual: yearlyPlan ? {
    //             name: yearlyPlan.name,
    //             price: yearlyPlan.price,
    //             credits: `${yearlyPlan.maxAnalyses} ${t('pricingCreditsLabel') || 'analiz'}`,
    //             highlighted: true,
    //             features: yearlyPlan.features,
    //             planId: yearlyPlan.id
    //         } : null
    //     };
    // };

    if (loading) {
        return (
            <div className="w-full font-onest py-16 flex flex-col min-h-screen justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                <p className="mt-4 text-gray-600">Planlar yükleniyor...</p>
            </div>
        );
    }

    return (
        <div id="pricing" className="w-full font-onest py-8 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-purple-50/30 pointer-events-none" />
            <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="text-center relative z-10 animate-in fade-in duration-1000">
                {/* <div className="inline-flex items-center justify-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 mb-6">
                    <Sparkles className="w-4 h-4 text-purple-500 mr-2" />
                    <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {t('pricingPlans')}
                    </span>
                </div> */}
                <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-[1.2]">
                    {t('pricingTitle')}
                </h2>
            </div>

            <div className="flex justify-center mb-8">
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
                <div className="lg:max-w-4xl xl:max-w-5xl mx-auto mb-12 animate-in slide-in-from-bottom duration-700 delay-100">
                    <Card className="border-2 border-purple-200/60 bg-gradient-to-br from-white to-purple-50/30 backdrop-blur-sm shadow-xl shadow-purple-100/40 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

                        <CardHeader className="text-center relative">
                            <h3 className="xl:text-2xl 2xl:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1">
                                {t('corporatePricingTitle')}
                            </h3>
                            <p className="text-gray-600 max-w-2xl mx-auto text-body2 xl:text-body1">
                                {t('corporatePricingDesc')}
                            </p>
                        </CardHeader>

                        <CardContent className="relative">
                            <div className="grid md:grid-cols-3 gap-8 mb-2">
                                {[
                                    { icon: Users, title: t('corporatePricingUsersTitle'), desc: t('corporatePricingUsersDesc') },
                                    { icon: Zap, title: t('corporatePricingSupport'), desc: t('corporatePricingSupportDesc') },
                                    { icon: Shield, title: t('corporatePricingSecurity'), desc: t('corporatePricingSecurityDesc') }
                                ].map((item, index) => (
                                    <div key={index} className="text-center p-6 group">
                                        <div className="relative p-4 bg-white rounded-2xl shadow-sm mb-2 inline-block group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                                            <item.icon className="w-6 h-6 text-purple-600 group-hover:text-blue-600 transition-colors duration-300" />
                                        </div>
                                        <h4 className="font-bold text-gray-800 mb-3 text-body1 xl:text-lg">{item.title}</h4>
                                        <p className="text-gray-600 leading-relaxed text-body2 xl:text-body1">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-purple-200/60 shadow-lg">
                                <div className="text-center mb-4">
                                    <h4 className="xl:text-xl 2xl:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
                                        {t('offer')}
                                    </h4>
                                    <p className="text-gray-600 text-body2 xl:text-body1">{t('offerDesc')}</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                    <Link href="/contact">
                                        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 rounded-xl flex items-center gap-3 group shadow-lg shadow-purple-200/40 hover:shadow-xl hover:shadow-purple-200/60 transition-all duration-300 hover:-translate-y-1">
                                            <Mail className="w-5 h-5" />
                                            <span className="font-medium text-body3 xl:text-body2">{t('contact')}</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                        </Button>
                                    </Link>

                                    <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-600">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                                            <Phone className="w-4 h-4 text-purple-500" />
                                            <span className="font-medium text-body3 xl:text-body2">+90 (212) 555 0123</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                                            <Mail className="w-4 h-4 text-purple-500" />
                                            <span className="font-medium text-body3 xl:text-body2">ainonceai@gmail.com</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {customerType === "individual" && (
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {getAllIndividualPlans().map((plan, index) => (
                        <div
                            key={plan.planId || index}
                            className="animate-in slide-in-from-bottom duration-700"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <PricingCard
                                name={plan.name}
                                price={plan.price}
                                credits={plan.credits}
                                features={plan.features}
                                highlighted={plan.highlighted}
                                billingPeriod={plan.billingType as BillingPeriod}
                                customerType={customerType}
                                isOneTime={plan.billingType === 'onetime'}
                                planId={plan.planId}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}