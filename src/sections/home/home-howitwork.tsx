'use client';
import { Card } from "@/components/ui/card";
import { useTranslate } from "@/locales";

export function HomeHowItWorks() {
    const { t } = useTranslate('home');
    return (
        <div id="how-it-works" className="w-full flex justify-center items-center min-h-screen">
            <div className="w-full lg:w-3/4 bg-slate-900 text-white rounded-3xl p-12 mt-16">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold mb-4 font-onest"> {t('hiwTitle')} </h2>
                    <p className="text-slate-300 max-w-3xl mx-auto font-onest mt-8">
                        {t('hiwDesc')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                    <StepCard
                        number="1"
                        title="hiwStep1Title"
                        description="hiwStep1Desc"
                    />

                    <StepCard
                        number="2"
                        title="hiwStep2Title"
                        description="hiwStep2Desc"
                    />

                    <StepCard
                        number="3"
                        title="hiwStep3Title"
                        description="hiwStep3Desc"
                    />
                </div>
            </div>
        </div>
    );
}

interface StepCardProps {
    number: string;
    title: string;
    description: string;
}

function StepCard({ number, title, description }: StepCardProps) {
    const { t } = useTranslate('home');
    return (
        <Card className="bg-slate-800 border-0 p-8 text-center h-full flex flex-col items-center">
            <div className="bg-purple-600 w-12 h-12 rounded-lg mb-6 flex items-center justify-center text-white font-bold text-xl font-onest">
                {number}
            </div>

            <h3 className="text-xl font-bold mb-4 font-onest text-white">{t(title)}</h3>

            <p className="text-slate-300 text-sm font-onest">
                {t(description)}
            </p>
        </Card>
    );
}