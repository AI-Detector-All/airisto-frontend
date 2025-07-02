'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Bot, FileCheck, BarChart3, Check, X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { signUp } from "@/services/auth";
import { useRouter } from "next/navigation";
import { CheckedState } from "@radix-ui/react-checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslate } from "@/locales";
import { Toaster } from "@/components/ui/sonner";
import { RolesEnum } from "@/enums/roles";

type UserRole = 'USER' | 'ACADEMICIAN' | 'STUDENT';

export default function Page() {
    const { t } = useTranslate('sign-up');
    const [userData, setUserData] = useState({
        email: '',
        name: '',
        surname: '',
        password: '',
        orcidId: '',
        provider: 'LOCAL',
        isActive: false,
        role: RolesEnum.USER,
    });
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false
    });
    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            router.push('/dashboard');
        }
    }, [])

    const handleUserChange = (field: string, value: string | boolean) => {
        if (field === 'password' && typeof value === 'string') {
            validatePassword(value);
        }

        if (field === 'role' && typeof value === 'string' && value !== 'ACADEMICIAN') {
            setUserData(prev => ({ ...prev, [field]: value as RolesEnum, orcidId: '' }));
        } else {
            setUserData({ ...userData, [field]: value });
        }

        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

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

        if (!userData.name.trim()) {
            newErrors.name = t('requiredName');
        }

        if (!userData.surname.trim()) {
            newErrors.surname = t('requiredSurName');
        }

        if (!userData.email.trim()) {
            newErrors.email = t('requiredEmail');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            newErrors.email = t('invalidEmail');
        }

        if (!userData.password) {
            newErrors.password = t('requiredPassword');
        }

        if (userData.role === 'ACADEMICIAN' && !userData.orcidId.trim()) {
            newErrors.orcidId = t('requiredOrcidForAcademician');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async () => {
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

        if (!acceptTerms) {
            toast.error(t('errorAcceptTerms'), {
                description: t('errorAcceptTermsDesc'),
                duration: 3000,
                style: {
                    background: '#f59e0b',
                    color: '#ffffff',
                    border: 'none'
                }
            });
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

        setIsLoading(true);

        try {
            const response = await signUp(userData);

            if (response) {
                toast.success(`${t('welcome')}, ${userData.name}! 🎉`, {
                    description: t('redirectToEmailVerification'),
                    duration: 3000,
                    style: {
                        background: '#10b981',
                        color: '#ffffff',
                        border: 'none'
                    }
                });

                setTimeout(() => {
                    router.push(`/verify-email?token=${response.emailVerificationToken}&email=${response.authResponse.user.email}`);
                }, 3000);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Signup failed:', error);

            let errorMessage = t('errorDesc');
            let errorTitle = t('errorTitle');

            if (error?.response?.status === 409) {
                errorTitle = t('errorConflict');
                errorMessage = t('errorConflictDesc');
            } else if (error?.response?.status === 400) {
                errorTitle = t('errorInvalidSignUp');
                errorMessage = t('errorInvalidSignUpDesc');
            } else if (error?.response?.status === 500) {
                errorTitle = t('errorServer');
                if (error?.response?.data?.message?.includes('EMAIL_SEND_FAILED')) {
                    errorMessage = t('errorServerEmail')
                } else {
                    errorMessage = t('errorServerDesc');
                }
            } else if (error?.response?.status === 429) {
                errorTitle = t('errorToManyRequests');
                errorMessage = t('errorToManyRequestsDesc');
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
        } finally {
            setIsLoading(false);
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isLoading) {
            handleSignup();
        }
    };

    const handleTermsChange = (checked: CheckedState) => {
        if (checked === 'indeterminate') {
            setAcceptTerms(false);
        } else {
            setAcceptTerms(checked);
        }
    };

    const getRoleDisplayName = (role: UserRole) => {
        switch (role) {
            case 'USER':
                return t('roleUser');
            case 'ACADEMICIAN':
                return t('roleAcademician');
            case 'STUDENT':
                return t('roleStudent');
            default:
                return t('roleUser');
        }
    };

    const features = [
        {
            icon: <Shield className="h-5 w-5" />,
            title: t('features.advancedDetection.title'),
            description: t('features.advancedDetection.description')
        },
        {
            icon: <Bot className="h-5 w-5" />,
            title: t('features.multiModelSupport.title'),
            description: t('features.multiModelSupport.description')
        },
        {
            icon: <FileCheck className="h-5 w-5" />,
            title: t('features.fileCompatibility.title'),
            description: t('features.fileCompatibility.description')
        },
        {
            icon: <BarChart3 className="h-5 w-5" />,
            title: t('features.detailedReports.title'),
            description: t('features.detailedReports.description')
        }
    ];

    return (
        <>
            <div className="flex flex-col w-full justify-center items-center">
                {/* Main container */}
                <div className="flex justify-center p-4 xl:p-0 items-center w-full xl:max-w-[1250px] 2xl:max-w-7xl h-screen">
                    <div className="flex w-full bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                        {/* Left side - Gradient Background with Content */}
                        <div className="hidden md:flex w-1/2 bg-gradient-to-b from-blue-100 to-slate-900 flex-col items-center justify-center text-white relative px-12 py-6">
                            <div className="flex flex-col items-center justify-center h-full">
                                <div className="w-56 h-24 flex items-center justify-center mb-4">
                                    <Link href={"/"}>
                                        <Image
                                            src="/airisto-v2.png"
                                            alt="Next.js logo"
                                            width={180}
                                            height={38}
                                            priority
                                        />
                                    </Link>
                                </div>

                                <div className="text-center mb-8">
                                    <Badge variant="outline" className="bg-white/10 hover:bg-white/20 text-sm rounded-full mb-8 px-6 py-1">
                                        {t('aiTagline')}
                                    </Badge>
                                    <h2 className="text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold mb-2">{t('mainTitle')}</h2>
                                    <h2 className="text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold mb-6">{t('mainSubtitle')}</h2>
                                    <p className="text-sm lg:text-body3 xl:text-body2 text-gray-200 mb-8">
                                        {t('mainDescription')}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        {features.map((feature, index) => (
                                            <div key={index} className="flex items-start p-3 bg-white/5 rounded-lg backdrop-blur-sm">
                                                <div className="mr-3 text-indigo-300">
                                                    {feature.icon}
                                                </div>
                                                <div className="text-left">
                                                    <h3 className="font-medium text-sm">{feature.title}</h3>
                                                    <p className="text-xs text-gray-300">{feature.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex space-x-4">
                                        <div className="flex items-center text-xs">
                                            <CheckCircle className="h-4 w-4 mr-1 text-green-400" />
                                            <span>{t('detectAI')}</span>
                                        </div>
                                        <div className="flex items-center text-xs">
                                            <CheckCircle className="h-4 w-4 mr-1 text-green-400" />
                                            <span>{t('cancelAnytime')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Signup Form */}
                        <div className="flex flex-1 items-center justify-center p-6">
                            <div className="w-full max-w-md">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h1 className="text-2xl font-bold">{t('createAccount')}</h1>
                                        <p className="text-gray-500 text-sm mt-1">{t('getStarted')}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-16 w-32 rounded-lg justify-center mt-2">
                                            <Image
                                                src="/airisto-v2.png"
                                                alt="Airisto logo"
                                                width={150}
                                                height={38}
                                                priority
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* User Role Selection */}
                                    <div>
                                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">{t('roleLabel')}</label>
                                        <Select value={userData.role} onValueChange={(value: UserRole) => handleUserChange('role', value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={t('roleSelectPlaceholder')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="USER">{getRoleDisplayName('USER')}</SelectItem>
                                                <SelectItem value="ACADEMICIAN">{getRoleDisplayName('ACADEMICIAN')}</SelectItem>
                                                <SelectItem value="STUDENT">{getRoleDisplayName('STUDENT')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t('firstNameLabel')}</label>
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder={t('firstNamePlaceholder')}
                                                value={userData.name}
                                                onChange={(e) => handleUserChange("name", e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                disabled={isLoading}
                                                className={errors.name ? 'border-red-500' : ''}
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">{t('lastNameLabel')}</label>
                                            <Input
                                                id="surname"
                                                type="text"
                                                placeholder={t('lastNamePlaceholder')}
                                                value={userData.surname}
                                                onChange={(e) => handleUserChange('surname', e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                disabled={isLoading}
                                                className={errors.surname ? 'border-red-500' : ''}
                                            />
                                            {errors.surname && (
                                                <p className="text-red-500 text-xs mt-1">{errors.surname}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('emailLabel')}</label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder={t('emailPlaceholder')}
                                            value={userData.email}
                                            onChange={(e) => handleUserChange('email', e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            disabled={isLoading}
                                            className={errors.email ? 'border-red-500' : ''}
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">{t('passwordLabel')}</label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder={t('passwordPlaceholder')}
                                            value={userData.password}
                                            onChange={(e) => handleUserChange('password', e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            disabled={isLoading}
                                            className={errors.password ? 'border-red-500' : ''}
                                        />
                                        {errors.password && (
                                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                                        )}

                                        {userData.password && (
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

                                                {userData.password && (
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

                                    {userData.role === RolesEnum.ACADEMICIAN && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <label htmlFor="orcid" className="block text-sm font-medium text-gray-700">
                                                    {t('orcidLabel')}
                                                    {userData.role === 'ACADEMICIAN' && <span className="text-red-500 ml-1">*</span>}
                                                </label>
                                            </div>
                                            <Input
                                                id="orcid"
                                                type="text"
                                                placeholder={userData.role === 'ACADEMICIAN' ? t('orcidPlaceholderRequired') : t('orcidPlaceholder')}
                                                value={userData.orcidId}
                                                onChange={(e) => handleUserChange('orcidId', e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                disabled={isLoading}
                                                className={errors.orcidId ? 'border-red-500' : ''}
                                            />
                                            {errors.orcidId && (
                                                <p className="text-red-500 text-xs mt-1">{errors.orcidId}</p>
                                            )}
                                            {userData.role === 'ACADEMICIAN' && (
                                                <p className="text-xs text-gray-500 mt-1">{t('orcidRequiredNote')}</p>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="terms"
                                            checked={acceptTerms}
                                            onCheckedChange={handleTermsChange}
                                            disabled={isLoading}
                                        />
                                        <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                                            <Link href="/terms" className="text-fuchsia-600 hover:text-fuchsia-500">{t('termsOfService')}</Link>{t('acceptTermsStart')} {t('acceptTermsText')} <Link href="/privacy" className="text-fuchsia-600 hover:text-fuchsia-500">{t('privacyPolicy')}</Link>{t('acceptTermsEnd')}
                                        </label>
                                    </div>

                                    <Button
                                        type="submit"
                                        onClick={handleSignup}
                                        className="w-full bg-gradient-to-r from-fuchsia-500 to-magenta-500 hover:from-fuchsia-600 hover:to-magenta-600 text-white py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={isLoading || !acceptTerms || !isPasswordValid()}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Hesap oluşturuluyor...</span>
                                            </div>
                                        ) : (
                                            t('createAccountButton')
                                        )}
                                    </Button>

                                    <div className="text-center mt-4">
                                        <p className="text-sm text-gray-600">
                                            {t('alreadyHaveAccount')} <Link href="/sign-in" className="text-fuchsia-600 hover:text-fuchsia-500 font-medium">{t('signInLink')}</Link>
                                        </p>
                                    </div>
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