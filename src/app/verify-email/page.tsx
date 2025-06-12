'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, CheckCircle, ArrowLeft, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslate } from "@/locales";

export default function Page() {
    const { t, currentLang } = useTranslate('verify-email');
    const [isResending, setIsResending] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const [userEmail, setUserEmail] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            router.push('/dashboard');
        }

        const token = searchParams.get('token');
        const email = searchParams.get('email');

        if (!token || !email) {
            router.push('/sign-up');
            return;
        }

        setUserEmail(email || '');
    }, [searchParams, router]);

    useEffect(() => {
        let interval: string | number | NodeJS.Timeout | undefined;
        if (resendCooldown > 0) {
            interval = setInterval(() => {
                setResendCooldown(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendCooldown]);

    const handleResendEmail = async () => {
        setIsResending(true);
        try {
            // API call to resend verification email
            setResendCooldown(60);
        } catch (error) {
            console.error('Failed to resend email:', error);
        } finally {
            setIsResending(false);
        }
    };

    const handleBackToSignup = () => {
        router.push('/sign-up');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="w-full flex justify-start items-start p-8">
                <Link href="/" className="flex gap-2">
                    <ArrowLeft className="h-5 w-5" />
                    <h1 className="text-body2 font-onest font-bold text-gray-700"> Airisto </h1>
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-fuchsia-100 to-fuchsia-200 flex items-center justify-center">
                                <Image
                                    src="/airisto.png"
                                    alt="Airisto logo"
                                    width={32}
                                    height={24}
                                    priority
                                />
                            </div>
                            <h1 className="text-header4 font-bold font-onest tracking-wider text-gray-800">Airisto</h1>
                        </div>
                    </div>

                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-fuchsia-100 to-magenta-100 rounded-full flex items-center justify-center">
                        <Mail className="h-10 w-10 text-fuchsia-600" />
                    </div>

                    <p className="text-body2 text-gray-600 mb-4 leading-relaxed">
                        {currentLang.value === 'tr' ? (
                            <div>
                                <span className="font-semibold text-fuchsia-600">{userEmail}</span> adresine doğrulama linki gönderdik.
                            </div>
                        ) : (
                            <div>
                                We sent a verification link to <span className="font-semibold text-fuchsia-600">
                                    {userEmail}
                                </span>
                            </div>
                        )}

                    </p>
                    <p className="text-body2 text-gray-600 mb-8 leading-relaxed">
                        {t('checkEmail')}
                    </p>

                    <Badge variant="outline" className="bg-success-50 text-success-700 border-success-200 mb-8">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {t('emailSend')}
                    </Badge>

                    <div className="space-y-4">
                        <Button
                            onClick={handleResendEmail}
                            disabled={isResending || resendCooldown > 0}
                            variant="outline"
                            className="w-full border-fuchsia-200 text-fuchsia-700 hover:bg-fuchsia-50 py-3"
                        >
                            {isResending ? (
                                <>
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                    {t('sending')}
                                </>
                            ) : resendCooldown > 0 ? (
                                `${t('sendAgain')} (${resendCooldown}s)`
                            ) : (
                                <>{t('sendAgain2')}</>
                            )}
                        </Button>

                        <Button
                            onClick={handleBackToSignup}
                            variant="ghost"
                            className="w-full text-gray-600 hover:text-gray-800 py-3"
                        >
                            {t('backToSignUp')}
                        </Button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <p className="text-body3 text-gray-500 mb-4">
                            {t('didntGetEmail')}
                        </p>
                        <ul className="text-body3 text-gray-500 space-y-1">
                            <li>{t('list1')}</li>
                            <li>{t('list2')}</li>
                            <li>{t('list3')}</li>
                        </ul>
                    </div>

                    <div className="mt-6">
                        <p className="text-body3 text-gray-500">
                            {t('stillTrouble')}
                            <Link href="/support" className="text-fuchsia-600 hover:text-fuchsia-500 font-medium">
                                {t('contactSupport')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}