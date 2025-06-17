'use client';
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "../contact-form";
import { ContactLeft } from "../contact-left";
import { CheckCircle2, Globe, Users } from "lucide-react";
import { useTranslate } from "@/locales";

export default function ContactView() {
    const { t } = useTranslate('contact');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30">

            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                            {t('contactTitle')}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('contactSubtitle')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-12">

                    <ContactLeft />

                    <ContactForm />

                </div>

                <div className="lg:mt-16 text-center">
                    <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm max-w-4xl mx-auto">
                        <CardContent className="p-8">
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="p-3 bg-purple-100 rounded-full inline-block mb-4">
                                        <Globe className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-800 mb-2">{t('globalSupportTitle')}</h3>
                                    <p className="text-sm text-gray-600">
                                        {t('globalSupportDescription')}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="p-3 bg-blue-100 rounded-full inline-block mb-4">
                                        <Users className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-800 mb-2">{t('expertTeamTitle')}</h3>
                                    <p className="text-sm text-gray-600">
                                        {t('expertTeamDescription')}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="p-3 bg-green-100 rounded-full inline-block mb-4">
                                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-800 mb-2">{t('fastSolutionTitle')}</h3>
                                    <p className="text-sm text-gray-600">
                                        {t('fastSolutionDescription')}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}