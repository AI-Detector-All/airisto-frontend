'use client';
import { Button } from "@/components/ui/button";
import { useTranslate } from "@/locales";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

export function HomeTechnology() {
    const { t, currentLang } = useTranslate('home');

    return (
        <div className="relative w-full overflow-hidden font-onest">
            <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20 px-4">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

                <div className="relative max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-12">

                        <div className="lg:w-1/3 flex justify-center">
                            <div className="relative group">
                                <div className="relative bg-white rounded-2xl p-8 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                                    <FileText className="w-16 h-16 text-slate-700" />

                                    <div className="absolute -top-3 -left-3 w-4 h-4 bg-blue-400 rounded-full animate-pulse" />
                                    <div className="absolute -top-3 -right-3 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-300" />
                                    <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-green-400 rounded-full animate-pulse delay-700" />
                                    <div className="absolute -bottom-3 -right-3 w-4 h-4 bg-orange-400 rounded-full animate-pulse delay-1000" />

                                    <div className="absolute top-1/2 -right-8 w-6 h-px bg-gradient-to-r from-white to-transparent" />
                                    <div className="absolute top-1/2 -left-8 w-6 h-px bg-gradient-to-l from-white to-transparent" />
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-2/3 text-white">


                            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                {currentLang.value === 'tr' ? (
                                    <div>
                                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent">
                                            RegressionPro™
                                        </span> ile Gerçek İçeriği<br />Ortaya Çıkarın
                                    </div>
                                ) : (
                                    <div>
                                        <span>
                                            Realistic Content Detection
                                        </span> with<br />
                                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent">
                                            RegressionPro™
                                        </span>
                                    </div>
                                )}

                            </h2>

                            <h3 className="text-xl text-blue-200 mb-6 font-medium">
                                {t('technologySection.subtitle')}
                            </h3>

                            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-3xl text-justify">
                                {t('technologySection.description')}
                            </p>

                            <Link href={'/#how-it-works'}>
                                <Button
                                    size="lg"
                                    className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                                >
                                    {t('technologySection.ctaText')}
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}