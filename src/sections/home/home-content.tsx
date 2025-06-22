'use client';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslate } from "@/locales";
import { Brain, Shield, Target, ArrowRight, Users, Sparkles } from "lucide-react";

export function HomeContent() {
  const { t, currentLang } = useTranslate('home');

  const mainFeatures = [
    {
      icon: Brain,
      title: t('homeContent.features.title'),
      description: t('homeContent.features.desc'),
      gradient: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100"
    },
    {
      icon: Shield,
      title: t('homeContent.features.title1'),
      description: t('homeContent.features.desc1'),
      gradient: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100"
    },
    {
      icon: Target,
      title: t('homeContent.features.title2'),
      description: t('homeContent.features.desc2'),
      gradient: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100"
    },
    {
      icon: Users,
      title: t('homeContent.features.title3'),
      description: t('homeContent.features.desc3'),
      gradient: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 py-16 space-y-24">

      <section className="w-full">
        <div className="text-center mb-16">
          {currentLang.value === 'tr' && (
            <Badge
              variant="outline"
              className="mb-6 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium 
               bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200
               inline-flex items-start max-w-[95vw] whitespace-normal
               leading-tight min-h-fit"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
              <span className="break-words text-left">
                {t('homeHero.turkishFirst')}
              </span>
            </Badge>
          )}

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {t('homeContent.title')}
          </h2>

          <p className="text-body1 text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            {t('homeContent.desc')}
          </p>

          <p className="text-body2 text-gray-500 max-w-3xl mx-auto">
            {t('homeContent.desc2')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mainFeatures.map((feature, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-500 border-0 ${feature.bgColor} hover:scale-105 cursor-pointer overflow-hidden relative`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardContent className="p-8 flex flex-col items-center text-center h-full relative z-10">
                <div className={`w-16 h-16 ${feature.iconBg} flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className={`h-8 w-8 bg-gradient-to-r ${feature.gradient} bg-clip-text `} />
                </div>

                <h3 className="font-bold text-xl mb-4 text-gray-900 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-base leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* İstatistikler ve Branding */}
      <section className="w-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            {t('brandingMessages.tagline')}
          </h3>

          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            {t('brandingMessages.mission')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl font-bold mb-2">{t('homeHero.stats.accuracy')}</div>
              <div className="text-lg opacity-80">{t('homeHero.stats.accuracyLabel')}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl font-bold mb-2">{t('homeHero.stats.layers')}</div>
              <div className="text-lg opacity-80">{t('homeHero.stats.layersLabel')}</div>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t('ctaStartNow')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

    </div>
  );
}