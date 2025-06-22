'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslate } from "@/locales";
import { ArrowRight, Brain, Calculator, FileText, Search, Shield, Zap } from "lucide-react";
import Link from "next/link";

export function HomeTechnology() {
    const { t, currentLang } = useTranslate('home');

    const layers = [
        {
            number: "01",
            title: t('technologySection.layers.layer1.title'),
            description: t('technologySection.layers.layer1.description'),
            icon: Zap,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/20"
        },
        {
            number: "02",
            title: t('technologySection.layers.layer2.title'),
            description: t('technologySection.layers.layer2.description'),
            icon: Brain,
            color: "text-purple-400",
            bgColor: "bg-purple-500/10",
            borderColor: "border-purple-500/20"
        },
        {
            number: "03",
            title: t('technologySection.layers.layer3.title'),
            description: t('technologySection.layers.layer3.description'),
            icon: Search,
            color: "text-green-400",
            bgColor: "bg-green-500/10",
            borderColor: "border-green-500/20"
        },
        {
            number: "04",
            title: t('technologySection.layers.layer4.title'),
            description: t('technologySection.layers.layer4.description'),
            icon: Shield,
            color: "text-orange-400",
            bgColor: "bg-orange-500/10",
            borderColor: "border-orange-500/20"
        },
        {
            number: "05",
            title: t('technologySection.layers.layer5.title'),
            description: t('technologySection.layers.layer5.description'),
            icon: Calculator,
            color: "text-red-400",
            bgColor: "bg-red-500/10",
            borderColor: "border-red-500/20"
        }
    ];

    return (
        <div className="relative w-full overflow-hidden">
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

                            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-3xl">
                                {t('technologySection.description')}
                            </p>

                            <Button
                                size="lg"
                                className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                            >
                                {t('technologySection.ctaText')}
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative bg-gradient-to-b from-gray-50/50 to-white py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.04),transparent_50%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.04),transparent_50%)] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative">
                    <div className="text-center mb-20 space-y-6 animate-in fade-in duration-1000">
                        <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm rounded-full border border-blue-200/30 mb-4">
                            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {t('technologySection.bottom.title')}
                            </span>
                        </div>

                        <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                            {t('technologySection.processTitle')}
                        </h2>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            {t('technologySection.processDesc')}
                        </p>
                    </div>

                    <div className="mb-20">
                        <div className="lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 flex flex-col justify-center items-center">
                            {layers.slice(0, 3).map((layer, index) => (
                                <div
                                    key={index}
                                    className="group relative animate-in slide-in-from-bottom duration-700 fill-mode-both w-3/4 lg:w-full "
                                    style={{
                                        animationDelay: `${index * 150}ms`,
                                        animationFillMode: 'both'
                                    }}
                                >
                                    <Card className="relative h-full bg-white/80 backdrop-blur-sm border border-gray-200/60 hover:border-blue-200/60 transition-all duration-500 hover:shadow-lg hover:shadow-blue-100/40 group-hover:-translate-y-2 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                                        <CardContent className="p-8 relative z-10">
                                            <div className="flex items-start justify-between mb-6">
                                                <div className="relative">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100/60 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:shadow-md group-hover:shadow-blue-100/40">
                                                        <layer.icon className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                                                    </div>
                                                    <div className="absolute inset-0 bg-blue-200/40 rounded-2xl scale-0 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                                </div>

                                                <div className="text-3xl font-bold text-gray-300 group-hover:text-blue-300 transition-colors duration-300 font-mono">
                                                    0{layer.number}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                                                    {layer.title}
                                                </h3>

                                                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                                    {layer.description}
                                                </p>
                                            </div>

                                            <div className="mt-6 h-1 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full w-0 group-hover:w-full transition-all duration-700 ease-out" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center">
                            <div className="lg:grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl flex flex-col justify-center items-center">
                                {layers.slice(3, 5).map((layer, index) => (
                                    <div
                                        key={index + 3}
                                        className="group relative animate-in slide-in-from-bottom duration-700 fill-mode-both w-3/4 lg:w-full"
                                        style={{
                                            animationDelay: `${(index + 3) * 150}ms`,
                                            animationFillMode: 'both'
                                        }}
                                    >
                                        <Card className="relative h-full bg-white/80 backdrop-blur-sm border border-gray-200/60 hover:border-purple-200/60 transition-all duration-500 hover:shadow-lg hover:shadow-purple-100/40 group-hover:-translate-y-2 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-200/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                                            <CardContent className="p-8 relative z-10">
                                                <div className="flex items-start justify-between mb-6">
                                                    <div className="relative">
                                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100/60 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:shadow-md group-hover:shadow-purple-100/40">
                                                            <layer.icon className="w-6 h-6 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
                                                        </div>
                                                        <div className="absolute inset-0 bg-purple-200/40 rounded-2xl scale-0 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                                    </div>

                                                    <div className="text-3xl font-bold text-gray-300 group-hover:text-purple-300 transition-colors duration-300 font-mono">
                                                        0{layer.number}
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                                                        {layer.title}
                                                    </h3>

                                                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                                        {layer.description}
                                                    </p>
                                                </div>

                                                <div className="mt-6 h-1 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full w-0 group-hover:w-full transition-all duration-700 ease-out" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="text-center space-y-6 animate-in fade-in duration-1000 delay-500">
                        <div className="relative inline-block">
                            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                {t('technologySection.bottomText')}
                            </h3>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 animate-in slide-in-from-left duration-1000 delay-1000"
                                style={{ width: '60%' }} />
                        </div>

                        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            {t('technologySection.mission')}
                        </p>

                        <div className="pt-8">
                            <Link href={'/sign-in'} className="inline-flex items-center space-x-2 text-gray-500 group cursor-pointer hover:text-blue-600 transition-colors duration-300">
                                <span className="text-sm font-medium">
                                    {t('technologySection.bottom.more')}
                                </span>
                                <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:text-blue-600 transition-all duration-300"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}