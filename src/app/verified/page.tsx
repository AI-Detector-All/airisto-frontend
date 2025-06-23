'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmailToken } from "@/services/auth";
import { useTranslate } from "@/locales";

export default function EmailVerifiedPage() {
    const { t } = useTranslate('verified');
    const [isLoading, setIsLoading] = useState(true);
    const [verificationStatus, setVerificationStatus] = useState('loading'); // loading, success, error
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const token = searchParams.get('token');

                if (!token) {
                    setVerificationStatus('error');
                    setIsLoading(false);
                    return;
                }

                const response = await verifyEmailToken(token);
                await new Promise(resolve => setTimeout(resolve, 2000));

                if (response) {
                    setVerificationStatus('success');
                } else {
                    setVerificationStatus('error');
                }

            } catch (error) {
                console.error('Email verification failed:', error);
                setVerificationStatus('error');
            } finally {
                setIsLoading(false);
            }
        };

        verifyEmail();
    }, [searchParams]);

    const handleGoToLogin = () => {
        router.push('/sign-in');
    };

    const handleGoHome = () => {
        router.push('/');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <div className="flex-1 flex items-center justify-center px-4">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                        {/* Logo and Brand */}
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center gap-3">
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

                        {/* Loading Animation */}
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-fuchsia-100 to-magenta-100 rounded-full flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fuchsia-600"></div>
                        </div>

                        <h2 className="text-header3 font-bold text-gray-900 mb-3">
                            {t('verifyingEmail')}
                        </h2>
                        <p className="text-body2 text-gray-600">
                            {t('verifyingEmailDesc')}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (verificationStatus === 'error') {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <div className="flex-1 flex items-center justify-center px-4">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                        {/* Logo and Brand */}
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center gap-3">
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

                        {/* Error Icon */}
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-error-100 to-error-200 rounded-full flex items-center justify-center">
                            <svg className="h-10 w-10 text-error-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>

                        <h2 className="text-header3 font-bold text-gray-900 mb-3">
                            {t('verifyFail')}
                        </h2>
                        <p className="text-body2 text-gray-600 mb-8">
                            {t('verifyFailDesc')}
                        </p>

                        <div className="space-y-4">
                            <Button
                                onClick={() => router.push('/signup')}
                                className="w-full bg-gradient-to-r from-fuchsia-500 to-magenta-500 hover:from-fuchsia-600 hover:to-magenta-600 text-white py-3"
                            >
                                {t('newAccount')}
                            </Button>
                            <Button
                                onClick={handleGoHome}
                                variant="outline"
                                className="w-full py-3"
                            >
                                {t('backToHome')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-fuchsia-50 to-magenta-50">
            <div className="flex-1 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-fuchsia-100">
                    {/* Logo and Brand */}
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center gap-3">
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

                    {/* Success Animation */}
                    <div className="relative w-24 h-24 mx-auto mb-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-success-100 to-success-200 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-12 w-12 text-success-600" />
                        </div>
                        <div className="absolute -top-2 -right-2">
                            <Sparkles className="h-8 w-8 text-fuchsia-500 animate-pulse" />
                        </div>
                    </div>

                    {/* Success Message */}
                    <h2 className="text-header3 font-bold text-gray-900 mb-3">
                        {t('verifySuccess')}
                    </h2>
                    <p className="text-body2 text-gray-600 mb-6 leading-relaxed">
                        {t('verifySuccessDesc')}
                    </p>

                    {/* Success Badge */}
                    <Badge variant="outline" className="bg-success-50 text-success-700 border-success-200 mb-8">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {t('accountActivated')}
                    </Badge>

                    {/* Features Preview */}
                    <div className="bg-gradient-to-r from-fuchsia-50 to-magenta-50 rounded-lg p-4 mb-8">
                        <h3 className="font-semibold text-gray-800 mb-2">{t('whatCanYouDoNow')}</h3>
                        <ul className="text-sm text-gray-600 space-y-1 text-left">
                            <li>{t('list1')}</li>
                            <li>{t('list2')}</li>
                            <li>{t('list3')}</li>
                            <li>{t('list4')}</li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <Button
                            onClick={handleGoToLogin}
                            className="w-full bg-gradient-to-r from-fuchsia-500 to-magenta-500 hover:from-fuchsia-600 hover:to-magenta-600 text-white py-3"
                        >
                            {t('login')}
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                        <Button
                            onClick={handleGoHome}
                            variant="outline"
                            className="w-full border-fuchsia-200 text-fuchsia-700 hover:bg-fuchsia-50 py-3"
                        >
                            {t('backToHome')}
                        </Button>
                    </div>

                    {/* Welcome Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <p className="text-body3 text-gray-500">
                            {t('welcome')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center py-8 text-body3 text-gray-400">
                <p>&copy; {t('copyright')}</p>
            </div>
        </div>
    );
}