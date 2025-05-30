'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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


    const validateStep1 = () => {
        const newErrors: { [key: string]: string } = {};
        if (!corporateData.name.trim()) {
            newErrors.name = 'Kurum adı gereklidir';
        }
        if (!corporateData.domain.trim()) {
            newErrors.domain = 'Domain gereklidir';
        } else if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(corporateData.domain)) {
            newErrors.domain = 'Geçerli bir domain formatı giriniz';
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
                    Kurum Bilgileri
                </CardTitle>
                <CardDescription>
                    Yeni kurumun temel bilgilerini giriniz
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="corporateName">Kurum Adı *</Label>
                    <Input
                        id="corporateName"
                        value={corporateData.name}
                        onChange={(e) => handleCorporateChange('name', e.target.value)}
                        placeholder="Örn: Acme Corporation"
                        className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                        <p className="text-sm text-red-600">{errors.name}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="domain">Domain *</Label>
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
                        Kurumun e-posta domain&apos;i (örn: sirket.com)
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>Kurum Durumu</Label>
                        <p className="text-sm text-gray-500">
                            Kurum aktif olarak ayarlanacak mı?
                        </p>
                    </div>
                    <Switch
                        checked={corporateData.isActive}
                        onCheckedChange={(checked: boolean) => handleCorporateChange('isActive', checked)}
                    />
                </div>

                <div className="pt-4">
                    <Button onClick={handleStep1Next} className="w-full">
                        Devam Et
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}