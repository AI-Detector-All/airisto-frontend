'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin,
  Users,
  Zap,
  Shield
} from "lucide-react";
import { useTranslate } from "@/locales";

export function ContactLeft() {
  const { t } = useTranslate('contact');

  return (
    <div className="lg:col-span-1 space-y-8">
      
      <div className="space-y-6">
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{t('emailTitle')}</h3>
                <p className="text-gray-600 mb-2">{t('emailAddress')}</p>
                <p className="text-sm text-gray-500">{t('emailDescription')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{t('phoneTitle')}</h3>
                <p className="text-gray-600 mb-2">{t('phoneNumber')}</p>
                <p className="text-sm text-gray-500">{t('phoneDescription')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{t('addressTitle')}</h3>
                <p className="text-gray-600 mb-2 whitespace-pre-line">
                  {t('addressText')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle className="text-lg">{t('corporateCustomersTitle')}</CardTitle>
          </div>
          <CardDescription>
            {t('corporateDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {[
              { icon: Users, text: t('corporateFeature1') },
              { icon: Zap, text: t('corporateFeature2') },
              { icon: Shield, text: t('corporateFeature3') }
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-sm">
                <feature.icon className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>
          <div className="pt-2">
            <div className="flex items-center gap-2 text-sm text-purple-600 font-medium">
              <Mail className="w-4 h-4" />
              {t('corporateEmail')}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}