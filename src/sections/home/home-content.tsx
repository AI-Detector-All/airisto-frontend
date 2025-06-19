'use client';
import { Card, CardContent } from "@/components/ui/card";
import { useTranslate } from "@/locales";
import { Brain, Shield, Target, CheckCircle } from "lucide-react";

export function HomeContent() {
  const { t } = useTranslate('home');
  
  const features = [
    {
      icon: Brain,
      title: t('contentFeaturesTitle') || "",
      description: t('contentFeaturesDesc')
    },
    {
      icon: Shield,
      title: t('contentFeaturesTitle1'),
      description: t('contentFeaturesDesc1')
    },
    {
      icon: Target,
      title: t('contentFeaturesTitle2'),
      description: t('contentFeaturesDesc2')
    },
    {
      icon: CheckCircle,
      title: t('contentFeaturesTitle3'),
      description: t('contentFeaturesDesc3')
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-header font-onest font-bold text-center mb-4">
          {t('contentTitle')}
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          {t('contentDesc')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {features.map((feature, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
            <CardContent className="p-6 flex flex-col items-center text-center h-full">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-orange-500 flex items-center justify-center rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-3 font-onest text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm font-onest leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-bold font-onest text-gray-900 mb-4">
          {t('brandingMessages.tagline')}
        </h3>
        <p className="text-gray-600 font-onest italic">
          {t('brandingMessages.mission')}
        </p>
      </div>
    </div>
  );
}