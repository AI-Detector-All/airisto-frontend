'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Building2, CheckCircle, User } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { SignUpData } from "@/types/auth";
import { useTranslate } from "@/locales";

interface UserFormProps {
    userData: SignUpData;
    setUserData: (data: SignUpData) => void;
    validateStep2?: () => boolean;
    corporateData: { name: string; domain: string; isActive: boolean };
    setCurrentStep: (step: number) => void;
    handleSubmit: () => void;
    isSubmitting: boolean;
}

export function UserForm({ userData, setUserData, corporateData, setCurrentStep, handleSubmit, isSubmitting }: UserFormProps) {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { t, currentLang } = useTranslate('corporate');
    const handleUserChange = (field: string, value: string | boolean) => {
        setUserData({ ...userData, [field]: value });
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <Card className="w-full font-onest">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {t('userAssign')}
                </CardTitle>
                <CardDescription>
                    {currentLang.value === 'tr' ? (
                        <p>
                            <strong>{corporateData.name}</strong> kurumu için bir kullanıcı oluşturunuz
                        </p>
                    ) : (
                        <p>
                            Create a user for <strong>{corporateData.name}</strong> corporation
                        </p>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Corporate Info Summary */}
                <Alert>
                    <Building2 className="h-4 w-4" />
                    <AlertDescription>
                        <strong> {t('corporate')} :</strong> {corporateData.name} ({corporateData.domain})
                        <Badge variant={corporateData.isActive ? "default" : "secondary"} className="ml-2">
                            {corporateData.isActive ? t('active') : t('inactive')}
                        </Badge>
                    </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="userEmail">{t('email')} *</Label>
                        <Input
                            id="userEmail"
                            type="email"
                            value={userData.email}
                            onChange={(e) => handleUserChange('email', e.target.value)}
                            placeholder="kullanici@acme.com"
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="userName"> {t('name')} *</Label>
                        <Input
                            id="userName"
                            value={userData.name}
                            onChange={(e) => handleUserChange('name', e.target.value)}
                            placeholder="Ahmet"
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="userSurname">{t('surname')}*</Label>
                        <Input
                            id="userSurname"
                            value={userData.surname}
                            onChange={(e) => handleUserChange('surname', e.target.value)}
                            placeholder="Yılmaz"
                            className={errors.surname ? 'border-red-500' : ''}
                        />
                        {errors.surname && (
                            <p className="text-sm text-red-600">{errors.surname}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="userPassword">{t('password')} *</Label>
                    <Input
                        id="userPassword"
                        type="password"
                        value={userData.password}
                        onChange={(e) => handleUserChange('password', e.target.value)}
                        placeholder={t('passwordPl')}
                        className={errors.password ? 'border-red-500' : ''}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-600">{errors.password}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between">
                        <Label className="text-sm">{t('isActive')}</Label>
                        <Switch
                            checked={userData.isActive}
                            onCheckedChange={(checked: boolean) => handleUserChange('isActive', checked)}
                        />
                    </div>

                </div>

                <div className="flex gap-3 pt-4">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t('back')}
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex-1"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                {t('creating')}
                            </>
                        ) : (
                            <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                {t('create')}
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}