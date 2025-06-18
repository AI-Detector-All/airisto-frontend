'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Building2, 
  MessageSquare, 
  User,
  Send,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { useTranslate } from "@/locales";

export function ContactForm() {
  const { t } = useTranslate('contact');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    customerType: 'individual',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Form submission logic here
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Mesajınız başarıyla gönderildi!');
    }, 1000);
  };

  return (
    <div className="lg:col-span-2">
      <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            {t('sendMessageTitle')}
          </CardTitle>
          <CardDescription className="text-base">
            {t('sendMessageDescription')}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-3">
              <Label className="text-sm font-medium">{t('customerTypeLabel')}</Label>
              <div className="flex gap-4">
                <div 
                  className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.customerType === 'individual' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData({...formData, customerType: 'individual'})}
                >
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">{t('individualLabel')}</p>
                      <p className="text-sm text-gray-500">{t('individualDescription')}</p>
                    </div>
                  </div>
                </div>
                <div 
                  className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.customerType === 'corporate' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData({...formData, customerType: 'corporate'})}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">{t('corporateLabel')}</p>
                      <p className="text-sm text-gray-500">{t('corporateForBusiness')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  {t('firstNameLabel')} {t('requiredField')}
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder={t('firstNamePlaceholder')}
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  {t('lastNameLabel')} {t('requiredField')}
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder={t('lastNamePlaceholder')}
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  {t('emailLabel')} {t('requiredField')}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('emailPlaceholder')}
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  {t('phoneLabel')}
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t('phonePlaceholder')}
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
            </div>

            {formData.customerType === 'corporate' && (
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium">
                  {t('companyLabel')} {t('requiredField')}
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder={t('companyPlaceholder')}
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  required={formData.customerType === 'corporate'}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium">
                {t('subjectLabel')} {t('requiredField')}
              </Label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                required
              >
                <option value="">{t('subjectPlaceholder')}</option>
                <option value="general">{t('subjectGeneral')}</option>
                <option value="support">{t('subjectSupport')}</option>
                <option value="sales">{t('subjectSales')}</option>
                <option value="corporate">{t('subjectCorporate')}</option>
                <option value="partnership">{t('subjectPartnership')}</option>
                <option value="other">{t('subjectOther')}</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                {t('messageLabel')} {t('requiredField')}
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={formData.customerType === 'corporate' 
                  ? t('messagePlaceholderCorporate')
                  : t('messagePlaceholderIndividual')
                }
                className="border-gray-200 focus:border-purple-400 focus:ring-purple-400 min-h-[120px]"
                rows={5}
                required
              />
            </div>

            {formData.customerType === 'corporate' && (
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-800 mb-1">{t('corporateAdvantagesTitle')}</h4>
                    <p className="text-sm text-purple-700 mb-2">
                      {t('corporateAdvantagesDescription')}
                    </p>
                    <p className="text-xs text-purple-600">
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg font-medium group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {t('sendingMessage')}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {t('sendMessageButton')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {formData.customerType === 'corporate' 
                  ? t('responseGuaranteeCorporate')
                  : t('responseGuaranteeIndividual')
                }
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}