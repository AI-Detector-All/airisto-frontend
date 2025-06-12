'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTranslate } from "@/locales";
import { ArrowRight, Building2 } from "lucide-react";
import { useState } from "react";

interface CorporateFormProps {
    setCurrentStep: (step: number) => void;
    corporateData: {
        name: string;
        domain: string;
        isActive: boolean;
    };
    setCorporateData: (data: {
        name: string;
        domain: string;
        isActive: boolean;
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
        console.log("Step 1 data:", corporateData);

        if (validateStep1()) {

            setCurrentStep(2);
        }
    };

    return (
        <Card>
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