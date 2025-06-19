'use client';
import { Card } from "@/components/ui/card";
import { useTranslate } from "@/locales";
import { FileText, Brain, BarChart3, Shield, CheckCircle } from "lucide-react";

export function HomeHowItWorks() {
    const { t } = useTranslate('home');
    return (
        <div id="how-it-works" className="w-full flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="w-full lg:w-4/5 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white lg:rounded-3xl p-12 mt-16 shadow-2xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-6 font-onest bg-gradient-to-r from-purple-300 to-orange-300 bg-clip-text text-transparent">
                        {t('hiwTitle')}
                    </h2>
                    <p className="text-slate-300 max-w-4xl mx-auto font-onest text-lg leading-relaxed">
                        {t('hiwDesc')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-16">
                    <StepCard
                        number="1"
                        title={t('hiwStep1Title')}
                        description={t('hiwStep1Desc')}
                        icon={FileText}
                        gradient="from-purple-500 to-purple-600"
                    />

                    <StepCard
                        number="2"
                        title={t('hiwStep2Title')}
                        description={t('hiwStep2Desc')}
                        icon={BarChart3}
                        gradient="from-purple-600 to-fuchsia-600"
                    />

                    <StepCard
                        number="3"
                        title={t('hiwStep3Title')}
                        description={t('hiwStep3Desc')}
                        icon={Brain}
                        gradient="from-fuchsia-600 to-orange-500"
                    />

                    <StepCard
                        number="4"
                        title={t('hiwStep4Title')}
                        description={t('hiwStep4Desc')}
                        icon={Shield}
                        gradient="from-orange-500 to-orange-600"
                    />

                    <StepCard
                        number="5"
                        title={t('hiwStep5Title')}
                        description={t('hiwStep5Desc')}
                        icon={CheckCircle}
                        gradient="from-orange-600 to-purple-500"
                    />
                </div>

                <div className="mt-16 text-center">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
                        <h3 className="text-2xl font-bold mb-4 font-onest text-purple-300">
                            {t('hiwResultTitle')}
                        </h3>
                        <p className="text-slate-300 font-onest mb-6">
                            {t('hiwResultDesc')}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="bg-gradient-to-r from-purple-600/20 to-orange-600/20 p-4 rounded-lg">
                                <div className="font-semibold text-purple-300 mb-2">{t('hiwGeneralScore')}</div>
                                <div className="text-slate-300">{t('hiwResultScore')}</div>
                            </div>
                            <div className="bg-gradient-to-r from-purple-600/20 to-orange-600/20 p-4 rounded-lg">
                                <div className="font-semibold text-purple-300 mb-2">{t('hiwLayerDetail')}</div>
                                <div className="text-slate-300">{t('hiwResultDetails')}</div>
                            </div>
                            <div className="bg-gradient-to-r from-purple-600/20 to-orange-600/20 p-4 rounded-lg">
                                <div className="font-semibold text-purple-300 mb-2">{t('hiwReasons')}</div>
                                <div className="text-slate-300">{t('hiwResultReasons')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface StepCardProps {
    number: string;
    title: string;
    description: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    gradient: string;
}

function StepCard({ number, title, description, icon: Icon, gradient }: StepCardProps) {
    return (
        <Card className="bg-slate-800/60 backdrop-blur-sm border border-purple-500/20 p-6 text-center h-full flex flex-col items-center hover:bg-slate-800/80 transition-all duration-300 group hover:scale-105">
            <div className={`bg-gradient-to-r ${gradient} w-16 h-16 rounded-xl lg:mb-2 flex items-center justify-center text-white font-bold text-xl font-onest shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                {number}
            </div>

            <div className="">
                <Icon className="w-8 h-8 text-purple-300 mx-auto mb-3 group-hover:text-white transition-colors duration-300" />
            </div>

            <h3 className="text-lg font-bold font-onest text-white group-hover:text-purple-200 transition-colors duration-300">
                {title}
            </h3>

            <p className="text-slate-300 text-sm font-onest leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                {description}
            </p>
        </Card>
    );
}