'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Building2,
  CreditCard,
  Crown,
  CheckCircle,
  Mail,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { HomePricing } from '@/sections/home/home-pricing';
import { useTranslate } from '@/locales';

export default function Page() {
  const { t, currentLang } = useTranslate('subs-required')
  const { user } = useAuth();

  const corporateInfo = user?.corporate;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 font-onest ">
      <div className="max-w-6xl mx-auto mt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="h-12 w-12 text-fuchsia-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900"> {t('title')} </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('desc')}
          </p>
        </div>

        {/* Corporate Info Card */}
        <Card className="mb-8 border-l-4 border-l-fuchsia-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Crown className="h-6 w-6 text-yellow-500" />
                <CardTitle className="text-xl">{t('corporateInfo')}</CardTitle>
              </div>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                {t('activationStatus')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{t('corporateName')}</span>
                <span>{corporateInfo?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{t('corporateDomain')}</span>
                <span className="text-blue-600">{corporateInfo?.domain}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{t('corporateCreatedAt')}</span>
                <span>{corporateInfo?.createdAt ? new Date(corporateInfo.createdAt).toLocaleDateString('tr-TR') : 'Unknown'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warning Alert */}
        <Alert className="mb-8 border-amber-200 bg-amber-50">
          <CreditCard className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            {currentLang.value === 'tr' ? (
              <div>
                <strong>Önemli:</strong> Kurumunuz henüz aktif değil. Çalışanlarınızın sistemi kullanabilmesi için
                önce bir abonelik planı seçmeniz gerekmektedir. Abonelik aktivasyonu sonrası tüm
                <strong> @{corporateInfo?.domain}</strong> uzantılı email adresleri otomatik olarak kurumunuza bağlanacaktır.
              </div>
            ) : (
              <div>
                <strong>Important:</strong> Your company is currently inactive. Before selecting a subscription plan,
                you must first activate your company. All <strong> @{corporateInfo?.domain}</strong> email addresses will be automatically linked to your company after activation.
              </div>
            )}

          </AlertDescription>
        </Alert>

        {/* Subscription Plans */}
        <div className="mb-8">
          {/* <div className="grid lg:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? 'ring-2 ring-blue-500 shadow-lg scale-105' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    En Popüler
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                  <CardDescription className="font-medium text-blue-600">
                    {plan.users}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    Bu Planı Seç
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div> */}
          <HomePricing activePlansType='corporate' />
        </div>

      </div>
    </div>
  );
}