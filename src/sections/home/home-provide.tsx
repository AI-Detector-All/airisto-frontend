'use client';
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useTranslate } from "@/locales";

export function HomeProvide() {
  const { t } = useTranslate('home');

  // Mock analysis results
  const analysisResult = {
    aiProbability: 87,
    humanProbability: 13,
    indicators: [
      { name: "mockIndicator1", score: 92 },
      { name: "mockIndicator2", score: 88 },
      { name: "mockIndicator3", score: 76 },
      { name: "mockIndicator4", score: 83 }
    ]
  };

  return (
    <div className="w-full flex justify-center min-h-screen pt-16" id="features">
      <div className="w-full rounded-lg flex justify-center flex-col">
        <div className="p-8 text-center ">
          <h1 className="text-4xl font-bold font-onest"> {t('provideTitle')} </h1>
          <p className="text-gray-600 mt-2 font-onest">
            {t('provideDesc')}
          </p>
        </div>

        <div className="flex justify-center">
          <Button className="bg-fuchsia-400 font-onest rounded-md px-8 py-6 cursor-default hover:bg-fuchsia-400">
            <h1 className="text-white font-onest text-body2">{t('provideTitle2')}</h1>
          </Button>
        </div>

        <div className="lg:flex w-full lg:w-3/4 justify-center mx-auto mt-8">
          {/* Left section - content analysis preview */}
          <div className="w-full lg:w-1/2 p-4 lg:p-8 bg-slate-50 flex flex-col min-h-[400px] justify-center">
            <div className="bg-white p-4 rounded-lg border shadow-sm mb-4 overflow-y-auto h-64">
              <div className="flex items-center mb-2">
                <FileText className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-medium text-sm">sample-essay.txt</span>
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
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium font-onest">{t('provideResultTitle')}</span>
                  <span className="text-sm font-medium font-onest">{analysisResult.aiProbability}%</span>
                </div>
                <Progress value={analysisResult.aiProbability} className="h-2 bg-gray-200" />
              </div>

              <div className="space-y-3">
                {analysisResult.indicators.map((indicator, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600 font-onest">{indicator.name}</span>
                      <span className="text-xs font-medium font-onest">{indicator.score}%</span>
                    </div>
                    <Progress value={indicator.score} className="h-1 bg-gray-100" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right section - content */}
          <div className="w-full lg:w-1/2 p-4 lg:p-8 relative">
            {/* Decorative elements */}
            <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-purple-500/20"></div>
            <div className="absolute bottom-32 right-16 w-16 h-16 rounded-full bg-purple-600/30"></div>
            <div className="absolute bottom-24 right-32 w-8 h-8 rounded-full bg-purple-400/40"></div>

            <div className="mt-8 relative z-10">
              <p className="text-purple-600 mb-4 font-onest">{t('provideResultTitle2')}</p>

              <h2 className="text-3xl font-bold leading-tight mb-4 font-onest">
                {t('provideResultTitle3')}
              </h2>

              <p className="text-gray-700 mb-6 font-onest">
                {t('provideResultDesc')}
              </p>

              <div className="mb-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-medium flex items-center mb-2 font-onest">
                  <AlertCircle className="w-4 h-4 text-amber-500 mr-2" />
                  {t('provideWhyTitle')}
                </h4>
                <ul className="text-sm space-y-2 text-gray-700">
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

              <Button className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-6 py-3 h-auto">
                {t('Discover')} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
