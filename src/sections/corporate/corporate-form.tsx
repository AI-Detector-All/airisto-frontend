'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslate } from "@/locales";
import { ArrowRight, Building2 } from "lucide-react";
import { useState } from "react";

interface CorporateFormProps {
    setCurrentStep: (step: number) => void;
    corporateData: {
        name: string;
        domain: string;
        isActive: boolean;
        country: string;
        city: string;
        state: string;
        address: string;
        postalCode: string;
    };
    setCorporateData: (data: {
        name: string;
        domain: string;
        isActive: boolean;
        country: string;
        city: string;
        state: string;
        address: string;
        postalCode: string;
    }) => void
}

export function CorporateForm({ setCurrentStep, corporateData, setCorporateData }: CorporateFormProps) {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { t } = useTranslate('corporate');

    const validateStep1 = () => {
        const newErrors: { [key: string]: string } = {};
        if (!corporateData.name.trim()) {
            newErrors.name = t('needCorporateName');
        }
        if (!corporateData.domain.trim()) {
            newErrors.domain = t('needCorporateDomain');
        } else if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(corporateData.domain)) {
            newErrors.domain = t('invalidCorporateDomain');
        }
        if (!corporateData.address.trim()) {
            newErrors.address = t('needAddress') || 'Adres zorunludur';
        }
        if (!corporateData.city.trim()) {
            newErrors.city = t('needCity') || 'Şehir zorunludur';
        }
        if (!corporateData.country.trim()) {
            newErrors.country = t('needCountry') || 'Ülke zorunludur';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCorporateChange = (field: string, value: string | boolean) => {
        setCorporateData({ ...corporateData, [field]: value });
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleStep1Next = () => {
        if (validateStep1()) {
            setCurrentStep(2);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {t('corporateInfo')}
                </CardTitle>
                <CardDescription>
                    {t('corporateDesc')}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Corporate Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="corporateName"> {t('corporateName')} *</Label>
                        <Input
                            id="corporateName"
                            value={corporateData.name}
                            onChange={(e) => handleCorporateChange('name', e.target.value)}
                            placeholder={t('corporateNamePl')}
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="domain">{t('corporateDomain')} *</Label>
                        <Input
                            id="domain"
                            value={corporateData.domain}
                            onChange={(e) => handleCorporateChange('domain', e.target.value)}
                            placeholder="Örn: acme.com"
                            className={errors.domain ? 'border-red-500' : ''}
                        />
                        {errors.domain && (
                            <p className="text-sm text-red-600">{errors.domain}</p>
                        )}
                        <p className="text-xs text-gray-500">
                            {t('corporateDomainDesc')}
                        </p>
                    </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">
                        {t('addressInformation') || 'Adres Bilgileri'}
                    </h3>
                    
                    <div className="space-y-2">
                        <Label htmlFor="address">{t('address')} *</Label>
                        <Input
                            id="address"
                            value={corporateData.address}
                            onChange={(e) => handleCorporateChange('address', e.target.value)}
                            placeholder={t('addressPl') || 'Tam adres bilgisini giriniz'}
                            className={errors.address ? 'border-red-500' : ''}
                        />
                        {errors.address && (
                            <p className="text-sm text-red-600">{errors.address}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">{t('city') || 'Şehir'} *</Label>
                            <Input
                                id="city"
                                value={corporateData.city}
                                onChange={(e) => handleCorporateChange('city', e.target.value)}
                                placeholder={t('city') || 'Şehir'}
                                className={errors.city ? 'border-red-500' : ''}
                            />
                            {errors.city && (
                                <p className="text-sm text-red-600">{errors.city}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="state">{t('state') || 'İlçe/Eyalet'}</Label>
                            <Input
                                id="state"
                                value={corporateData.state}
                                onChange={(e) => handleCorporateChange('state', e.target.value)}
                                placeholder={t('state') || 'İlçe/Eyalet'}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="postalCode">{t('postalCode') || 'Posta Kodu'}</Label>
                            <Input
                                id="postalCode"
                                value={corporateData.postalCode}
                                onChange={(e) => handleCorporateChange('postalCode', e.target.value)}
                                placeholder={t('postalCode') || 'Posta Kodu'}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="country">{t('country') || 'Ülke'} *</Label>
                        <Select 
                            value={corporateData.country} 
                            onValueChange={(value) => handleCorporateChange('country', value)}
                        >
                            <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
                                <SelectValue placeholder={t('selectCountry') || 'Ülke seçiniz'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Türkiye">Türkiye</SelectItem>
                                <SelectItem value="United States">United States</SelectItem>
                                <SelectItem value="Canada">Canada</SelectItem>
                                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                <SelectItem value="Germany">Germany</SelectItem>
                                <SelectItem value="France">France</SelectItem>
                                <SelectItem value="Australia">Australia</SelectItem>
                                <SelectItem value="Japan">Japan</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.country && (
                            <p className="text-sm text-red-600">{errors.country}</p>
                        )}
                    </div>
                </div>

                {/* Corporate Status */}
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>{t('corporateStatus')}</Label>
                        <p className="text-sm text-gray-500">
                            {t('corporateIsActive')}
                        </p>
                    </div>
                    <Switch
                        checked={corporateData.isActive}
                        onCheckedChange={(checked: boolean) => handleCorporateChange('isActive', checked)}
                    />
                </div>

                <div className="pt-4">
                    <Button onClick={handleStep1Next} className="w-full">
                        {t('contuinue')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}