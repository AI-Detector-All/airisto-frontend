'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Check, X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getCookie } from "@/utils/cookie";
import { InlineLoader } from "@/components/ui/global-loader";
import { useTranslate } from "@/locales";
import { Toaster } from "@/components/ui/sonner";
import { resetPassword } from "@/services/auth";

export default function PasswordResetPage() {
    const { t } = useTranslate('password-reset');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const router = useRouter();
    const searchParams = useSearchParams();

    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false
    });

    useEffect(() => {
        const accessToken = getCookie('access_token');
        if (accessToken) {
            router.push('/dashboard');
        }

        const tokenParam = searchParams.get('token');
        if (!tokenParam) {
            router.push('/forgot-password');
        } else {
            setToken(tokenParam);
        }
    }, [router, searchParams]);

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

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!password) {
            newErrors.password = t('requiredPassword');
        } else if (!isPasswordValid()) {
            newErrors.password = t('invalidPassword');
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = t('requiredConfirmPassword');
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = t('passwordMismatch');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePasswordReset = async () => {
        if (!validateForm()) {
            toast.error(t('errorValidation'), {
                description: t('errorValidationDesc'),
                duration: 3000,
                style: {
                    background: '#ef4444',
                    color: '#ffffff',
                    border: 'none'
                }
            });
            return;
        }

        if (!token) {
            toast.error(t('errorToken'), {
                description: t('errorTokenDesc'),
                duration: 3000,
                style: {
                    background: '#ef4444',
                    color: '#ffffff',
                    border: 'none'
                }
            });
            return;
        }

        setIsLoading(true);
        try {
            await resetPassword(token, password);

            toast.success(t('successToast'), {
                description: t('successToastDesc'),
                duration: 3000,
                style: {
                    background: '#10b981',
                    color: '#ffffff',
                    border: 'none'
                }
            });

            setTimeout(() => {
                router.push('/sign-in');
            }, 3000);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Password reset failed:', error);

            let errorMessage = t('errorToastDesc');
            let errorTitle = t('errorToastTitle');

            if (error?.response?.status === 400) {
                errorTitle = t('errorInvalidToken');
                errorMessage = t('errorInvalidTokenDesc');
            } else if (error?.response?.status === 404) {
                errorTitle = t('errorTokenNotFound');
                errorMessage = t('errorTokenNotFoundDesc');
            } else if (error?.response?.status === 410) {
                errorTitle = t('errorTokenExpired');
                errorMessage = t('errorTokenExpiredDesc');
            } else if (error?.response?.status === 429) {
                errorTitle = t('errorTooManyRequests');
                errorMessage = t('errorTooManyRequestsDesc');
            } else if (error?.response?.status >= 500) {
                errorTitle = t('errorServer');
                errorMessage = t('errorServerDesc');
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
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        validatePassword(value);

        if (errors.password) {
            setErrors(prev => ({ ...prev, password: '' }));
        }

        if (confirmPassword && value !== confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: t('passwordMismatch') }));
        } else if (confirmPassword && value === confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: '' }));
        }
    };

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);

        if (password !== value) {
            setErrors(prev => ({ ...prev, confirmPassword: t('passwordMismatch') }));
        } else {
            setErrors(prev => ({ ...prev, confirmPassword: '' }));
        }
    };

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter' && password && confirmPassword && !isLoading) {
            handlePasswordReset();
        }
    };


    return (
        <>
            <div className="flex flex-col mt-8 max-w-[99%] justify-center items-center  font-onest">
                <div className="flex justify-center items-center lg:w-5/6 mt-8">
                    <div className="flex flex-1 items-center justify-center p-6">
                        <div className="w-full max-w-md">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold">{t('title')}</h1>
                                    <p className="text-gray-500 text-sm mt-1">{t('description')}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-16 w-32 rounded-lg justify-center mt-2">
                                        <Image
                                            src="/airisto-v2.png"
                                            alt="Airisto logo"
                                            width={180}
                                            height={38}
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('newPasswordLabel')}
                                    </label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder={t('newPasswordPlaceholder')}
                                        value={password}
                                        onChange={(e) => handlePasswordChange(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        disabled={isLoading}
                                        className={`w-full ${errors.password ? 'border-red-500' : ''}`}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                                    )}

                                    {/* Şifre Gereksinimleri */}
                                    {password && (
                                        <div className="mt-2 p-3 bg-gray-50 rounded-lg border">
                                            <p className="text-xs font-medium text-gray-700 mb-2">{t('passwordRequirements')}</p>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    {passwordValidation.minLength ?
                                                        <Check className="h-3 w-3 text-green-500" /> :
                                                        <X className="h-3 w-3 text-red-500" />
                                                    }
                                                    <span className={`text-xs ${passwordValidation.minLength ? 'text-green-600' : 'text-red-600'}`}>
                                                        {t('passwordMinLength')}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {passwordValidation.hasUppercase ?
                                                        <Check className="h-3 w-3 text-green-500" /> :
                                                        <X className="h-3 w-3 text-red-500" />
                                                    }
                                                    <span className={`text-xs ${passwordValidation.hasUppercase ? 'text-green-600' : 'text-red-600'}`}>
                                                        {t('passwordUppercase')}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {passwordValidation.hasLowercase ?
                                                        <Check className="h-3 w-3 text-green-500" /> :
                                                        <X className="h-3 w-3 text-red-500" />
                                                    }
                                                    <span className={`text-xs ${passwordValidation.hasLowercase ? 'text-green-600' : 'text-red-600'}`}>
                                                        {t('passwordLowercase')}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {passwordValidation.hasNumber ?
                                                        <Check className="h-3 w-3 text-green-500" /> :
                                                        <X className="h-3 w-3 text-red-500" />
                                                    }
                                                    <span className={`text-xs ${passwordValidation.hasNumber ? 'text-green-600' : 'text-red-600'}`}>
                                                        {t('passwordNumber')}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {passwordValidation.hasSpecialChar ?
                                                        <Check className="h-3 w-3 text-green-500" /> :
                                                        <X className="h-3 w-3 text-red-500" />
                                                    }
                                                    <span className={`text-xs ${passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-red-600'}`}>
                                                        {t('passwordSpecialChar')}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Şifre Gücü */}
                                            {password && (
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

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('confirmPasswordLabel')}
                                    </label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder={t('confirmPasswordPlaceholder')}
                                        value={confirmPassword}
                                        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        disabled={isLoading}
                                        className={`w-full ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                                    )}

                                    {confirmPassword && (
                                        <div className="flex items-center gap-2 mt-1">
                                            {password === confirmPassword ? (
                                                <>
                                                    <Check className="h-3 w-3 text-green-500" />
                                                    <span className="text-xs text-green-600">{t('passwordsMatch')}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <X className="h-3 w-3 text-red-500" />
                                                    <span className="text-xs text-red-600">{t('passwordsMismatch')}</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    onClick={handlePasswordReset}
                                    disabled={isLoading || !password || !confirmPassword || !isPasswordValid() || password !== confirmPassword}
                                    className="w-full bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <InlineLoader text={t('updatingPassword')} className="text-white flex items-center gap-4" />
                                    ) : (
                                        <>
                                            <Lock className="w-4 h-4 mr-2" />
                                            {t('updatePasswordButton')}
                                        </>
                                    )}
                                </Button>

                                <div className="text-center mt-4">
                                    <p className="text-sm text-gray-600">
                                        {t('rememberPassword')} {" "}
                                        <Link href="/sign-in" className="text-fuchsia-600 hover:text-fuchsia-500 font-medium">
                                            {t('login')}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Toaster />
        </>
    );
}