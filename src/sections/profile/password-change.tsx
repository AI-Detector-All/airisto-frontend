import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslate } from "@/locales";
import { changePassword } from "@/services/auth";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from '@/components/ui/sonner';
import { Check, X } from "lucide-react";

export function PasswordChange() {
    const { t } = useTranslate('profile')
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false
    });

    const validatePassword = (password: string) => {
        setPasswordValidation({
            minLength: password.length >= 8,
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
        });
    };

    const isPasswordValid = () => {
        return Object.values(passwordValidation).every(Boolean);
    };

    const getPasswordStrength = () => {
        const validCount = Object.values(passwordValidation).filter(Boolean).length;
        if (validCount <= 2) return { text: t('passwordStrengthWeak'), color: 'text-red-500' };
        if (validCount <= 4) return { text: t('passwordStrengthMedium'), color: 'text-yellow-500' };
        return { text: t('passwordStrengthStrong'), color: 'text-green-500' };
    };

    const handlePasswordSave = async () => {
        if (newPassword !== confirmPassword) {
            alert(t('passwordDoesntMatch'));
            return;
        }

        if (!isPasswordValid()) {
            toast.error(t('errorPasswordValid'), {
                description: t('errorPasswordValidDesc'),
                duration: 3000,
                style: {
                    background: '#ef4444',
                    color: '#ffffff',
                    border: 'none'
                }
            });
            return;
        }

        try {
            const response = await changePassword(currentPassword, newPassword);

            if (response) {
                toast.success(t('passwordChanged'), { duration: 3000 });
                window.location.reload();
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Update failed:', error);

            let errorMessage = t('errorDesc');
            let errorTitle = error.response.data.message;
            if (error?.response?.status === 500) {
                errorTitle = t('errorServer');
                errorMessage = t('errorServerDesc');
            } else if (!navigator.onLine) {
                errorTitle = t('errorNavigator');
                errorMessage = t('errorNavigatorDesc');
            } else if (error?.code === 'NETWORK_ERROR') {
                errorTitle = t('errorNetwork');
                errorMessage = t('errorNetworkDesc');
            }

            toast.error(errorTitle, {
                description: errorMessage,
                duration: 5000,
                style: {
                    background: '#ef4444',
                    color: '#ffffff',
                    border: 'none'
                }
            });
        }
    };

    return (
        <div>
            <Card className="w-full shadow-none border-none bg-transparent order-2 lg:order-2 font-onest">
                <CardContent className="p-0">
                    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg space-y-4 sm:space-y-6">
                        <div className="border-b border-gray-100 pb-3 sm:pb-4">
                            <h2 className='text-lg sm:text-xl lg:text-header4 text-gray-900 font-onest font-semibold'>
                                {t('changePassword')}
                            </h2>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword" className="text-sm font-medium">
                                    {t('currentPassword')}
                                </Label>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="••••••••••••••••"
                                    className='bg-gray-50 h-10 sm:h-11 border-gray-200 focus:border-gray-400'
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="newPassword" className="text-sm font-medium">
                                    {t('newPassword')}
                                </Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        validatePassword(e.target.value);
                                    }}
                                    placeholder="••••••••••••••••"
                                    className='bg-gray-50 h-10 sm:h-11 border-gray-200 focus:border-gray-400'
                                />

                                {/* Şifre Gereksinimleri */}
                                {newPassword && (
                                    <div className="mt-2 p-3 bg-gray-50 rounded-lg border">
                                        <p className="text-xs font-medium text-gray-700 mb-2">{t('passwordRequirements') || 'Şifre Gereksinimleri'}</p>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                {passwordValidation.minLength ?
                                                    <Check className="h-3 w-3 text-green-500" /> :
                                                    <X className="h-3 w-3 text-red-500" />
                                                }
                                                <span className={`text-xs ${passwordValidation.minLength ? 'text-green-600' : 'text-red-600'}`}>
                                                    {t('passwordMinLength') || 'En az 8 karakter'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {passwordValidation.hasUppercase ?
                                                    <Check className="h-3 w-3 text-green-500" /> :
                                                    <X className="h-3 w-3 text-red-500" />
                                                }
                                                <span className={`text-xs ${passwordValidation.hasUppercase ? 'text-green-600' : 'text-red-600'}`}>
                                                    {t('passwordUppercase') || 'En az bir büyük harf'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {passwordValidation.hasLowercase ?
                                                    <Check className="h-3 w-3 text-green-500" /> :
                                                    <X className="h-3 w-3 text-red-500" />
                                                }
                                                <span className={`text-xs ${passwordValidation.hasLowercase ? 'text-green-600' : 'text-red-600'}`}>
                                                    {t('passwordLowercase') || 'En az bir küçük harf'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {passwordValidation.hasNumber ?
                                                    <Check className="h-3 w-3 text-green-500" /> :
                                                    <X className="h-3 w-3 text-red-500" />
                                                }
                                                <span className={`text-xs ${passwordValidation.hasNumber ? 'text-green-600' : 'text-red-600'}`}>
                                                    {t('passwordNumber') || 'En az bir rakam'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {passwordValidation.hasSpecialChar ?
                                                    <Check className="h-3 w-3 text-green-500" /> :
                                                    <X className="h-3 w-3 text-red-500" />
                                                }
                                                <span className={`text-xs ${passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-red-600'}`}>
                                                    {t('passwordSpecialChar') || 'En az bir özel karakter'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Şifre Gücü */}
                                        {newPassword && (
                                            <div className="mt-2 pt-2 border-t border-gray-200">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-600">{t('passwordStrength')}</span>
                                                    <span className={`text-xs font-medium ${getPasswordStrength().color}`}>
                                                        {getPasswordStrength().text}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                                                    <div
                                                        className={`h-1 rounded-full transition-all duration-300 ${getPasswordStrength().text === t('passwordStrengthWeak') ? 'bg-red-500 w-1/3' :
                                                                getPasswordStrength().text === t('passwordStrengthMedium') ? 'bg-yellow-500 w-2/3' :
                                                                    'bg-green-500 w-full'
                                                            }`}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                                    {t('newPasswordRepeat')}
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••••••••••"
                                    className={`bg-gray-50 h-10 sm:h-11 border-gray-200 focus:border-gray-400 ${confirmPassword && newPassword !== confirmPassword
                                        ? 'border-red-300 focus:border-red-400'
                                        : ''
                                        }`}
                                />
                                {confirmPassword && newPassword !== confirmPassword && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {t('passwordDoesntMatch')}
                                    </p>
                                )}
                            </div>
                        </div>

                        <Button
                            className="w-full mt-6 bg-gray-800 hover:bg-slate-900 h-10 sm:h-11 text-sm sm:text-base font-medium"
                            onClick={handlePasswordSave}
                            disabled={!currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword || !isPasswordValid()}
                        >
                            {t('save')}
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Toaster />
        </div>
    )
}