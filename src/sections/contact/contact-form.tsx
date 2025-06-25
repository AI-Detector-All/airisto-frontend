'use client';
import { useState } from "react";
import axios from "axios";
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
  ArrowRight,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { useTranslate } from "@/locales";
import { sendMail } from "@/services/mail";
import { MailError } from "@/types/mail";

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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setStatusMessage('');
    }
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (!formData.firstName.trim()) {
      errors.push('Ad alanı zorunludur');
    }

    if (!formData.lastName.trim()) {
      errors.push('Soyad alanı zorunludur');
    }

    if (!formData.email.trim()) {
      errors.push('E-posta alanı zorunludur');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Geçerli bir e-posta adresi giriniz');
    }

    if (!formData.subject) {
      errors.push('Konu seçimi zorunludur');
    }

    if (!formData.message.trim()) {
      errors.push('Mesaj alanı zorunludur');
    }

    if (formData.customerType === 'corporate' && !formData.company.trim()) {
      errors.push('Kurumsal müşteriler için şirket adı zorunludur');
    }

    return errors;
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setSubmitStatus('error');
      setStatusMessage(validationErrors.join(', '));
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      const response = await sendMail(formData);

      setSubmitStatus('success');
      setStatusMessage(response.message);


      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        customerType: 'individual',
        subject: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitStatus('idle');
        setStatusMessage('');
      }, 5000);

    } catch (error) {
      console.error('Contact form submission error:', error);

      setSubmitStatus('error');

      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          const apiError = error.response.data as MailError;

          if (Array.isArray(apiError.message)) {
            setStatusMessage(apiError.message.join(', '));
          } else {
            setStatusMessage(apiError.message || 'Bir hata oluştu');
          }
        } else if (error.code === 'ECONNABORTED') {
          setStatusMessage('İstek zaman aşımına uğradı. Lütfen tekrar deneyin.');
        } else if (error.message.includes('Network Error')) {
          setStatusMessage('Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.');
        } else {
          setStatusMessage('Sunucu ile bağlantı kurulamadı');
        }
      } else {
        setStatusMessage('Beklenmeyen bir hata oluştu');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = () => {
    switch (submitStatus) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    }
  };

  const getStatusMessageColor = () => {
    switch (submitStatus) {
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-500';
    }
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
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-3">
              <Label className="text-sm font-medium">{t('customerTypeLabel')}</Label>
              <div className="flex gap-4">
                <div
                  className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.customerType === 'individual'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                  onClick={() => setFormData({ ...formData, customerType: 'individual' })}
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
                  className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.customerType === 'corporate'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                  onClick={() => setFormData({ ...formData, customerType: 'corporate' })}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                  </div>
                </div>
              </div>
            )}

            {/* Status Message */}
            {submitStatus !== 'idle' && statusMessage && (
              <div className={`p-4 rounded-lg border ${getStatusMessageColor()}`}>
                <div className="flex items-start gap-3">
                  {getStatusIcon()}
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {submitStatus === 'success' ? 'Başarılı!' : 'Hata'}
                    </p>
                    <p className="text-sm mt-1">{statusMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <Button
                type="submit"
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

              {submitStatus === 'idle' && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {formData.customerType === 'corporate'
                    ? t('responseGuaranteeCorporate')
                    : t('responseGuaranteeIndividual')
                  }
                </div>
              )}
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}