'use client';
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, AlertCircle, CheckCircle, Brain, Search, BarChart3, Shield, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useTranslate } from "@/locales";

export function HomeProvide() {
  const { t } = useTranslate('home');

  const analysisResult = {
    aiProbability: 87,
    humanProbability: 13,
    indicators: [
      { name: t('provideIndicator'), score: 92, icon: Search },
      { name: t('provideIndicator1'), score: 88, icon: BarChart3 },
      { name: t('provideIndicator2'), score: 76, icon: Brain },
      { name: t('provideIndicator3'), score: 83, icon: Shield },
      { name: t('provideIndicator4'), score: 89, icon: Zap }
    ]
  };

  return (
    <div className="w-full flex justify-center min-h-screen pt-16 bg-gradient-to-b from-gray-50 to-white" id="features">
      <div className="w-full rounded-lg flex justify-center flex-col">
        <div className="p-8 text-center">
          <h1 className="text-4xl font-bold font-onest mb-4">
            {t('provideTitle')}
          </h1>
          <p className="text-gray-600 mt-2 font-onest text-lg max-w-3xl mx-auto">
            {t('provideDesc')}
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <Button className="bg-gradient-to-r from-purple-500 to-orange-500 font-onest rounded-md px-8 py-6 cursor-default hover:from-purple-600 hover:to-orange-600 transition-all duration-300">
            <h1 className="text-white font-onest text-body2 font-semibold">{t('provideTitle2')}</h1>
          </Button>
        </div>

        <div className="lg:flex w-full lg:w-4/5 justify-center mx-auto mt-8">
          {/* Left section - RegressionPro™ analysis preview */}
          <div className="w-full lg:w-1/2 p-4 lg:p-8 bg-white rounded-lg border shadow-lg mr-4">
            <div className="bg-gradient-to-r from-purple-50 to-orange-50 p-4 rounded-lg border mb-4">
              <div className="flex items-center mb-2">
                <FileText className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-medium text-sm">örnek-makale.txt</span>
                <span className="ml-auto text-xs text-gray-500">RegressionPro™ Analizi</span>
              </div>
              <p className="text-sm text-gray-700">
                {t('provideLongDesc')}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="font-semibold mb-3 flex items-center font-onest">
                <AlertCircle className="w-5 h-5 text-amber-500 mr-2" />
                {t('provideResult')}
              </h3>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium font-onest">{t('provideResultTitle')}</span>
                  <span className="text-sm font-medium font-onest text-red-600">{analysisResult.aiProbability}%</span>
                </div>
                <Progress value={analysisResult.aiProbability} className="h-3 bg-gray-200" />
                <p className="text-xs text-gray-500 mt-1">{t('provideResultTitle4')}</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-sm font-onest text-gray-800 mb-3">{t('provideResultTitle5')}</h4>
                {analysisResult.indicators.map((indicator, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <indicator.icon className="w-4 h-4 text-purple-600 mr-2" />
                        <span className="text-xs font-medium font-onest">{indicator.name}</span>
                      </div>
                      <span className="text-xs font-medium font-onest">{indicator.score}%</span>
                    </div>
                    <Progress value={indicator.score} className="h-2 bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right section - content */}
          <div className="w-full lg:w-1/2 p-4 lg:p-8 relative">
            {/* Decorative elements */}
            <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-purple-500/20"></div>
            <div className="absolute bottom-32 right-16 w-16 h-16 rounded-full bg-orange-500/30"></div>
            <div className="absolute bottom-24 right-32 w-8 h-8 rounded-full bg-purple-400/40"></div>

            <div className="mt-8 relative z-10">
              <p className="text-purple-600 mb-4 font-onest font-semibold">{t('provideResultTitle2')}</p>

              <h2 className="text-3xl font-bold leading-tight mb-4 font-onest">
                {t('provideResultTitle3')}
              </h2>

              <p className="text-gray-700 mb-6 font-onest">
                {t('provideResultDesc')}
              </p>

              <div className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-medium flex items-center mb-3 font-onest">
                  <AlertCircle className="w-4 h-4 text-amber-500 mr-2" />
                  {t('provideWhyTitle')}
                </h4>
                <ul className="text-sm space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="font-onest">{t('provideResultReason1')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="font-onest">{t('provideResultReason2')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="font-onest">{t('provideResultReason3')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="font-onest">{t('provideResultReason4')}</span>
                  </li>
                </ul>
              </div>

              <Button className="bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white px-6 py-3 h-auto transition-all duration-300">
                {t('Discover')} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}