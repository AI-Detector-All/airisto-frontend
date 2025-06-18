'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/cookie";
import { InlineLoader } from "@/components/ui/global-loader";
import { useTranslate } from "@/locales";
import { Toaster } from "@/components/ui/sonner";
import { forgotPassword } from "@/services/auth";

export default function ForgotPasswordPage() {
    const { t, currentLang } = useTranslate('forgot-password');
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const token = getCookie('access_token');
        if (token) {
            router.push('/dashboard');
        }
    }, [router]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleForgotPassword = async () => {
        setIsLoading(true);
        try {
            await forgotPassword(email);

            setIsEmailSent(true);
            setCountdown(60);

            toast.success(`${t('successToast')} 📧`, {
                description: t('successToast'),
                duration: 3000,
                style: {
                    background: '#10b981',
                    color: '#ffffff',
                    border: 'none'
                }
            });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Forgot password failed:', error);

            let errorMessage = t('errorToastDesc');
            let errorTitle = t('errorToastTitle');

            if (error?.response?.status === 404) {
                errorTitle = t('errorToastEmail');
                errorMessage = t('errorToastEmailDesc');
            } else if (error?.response?.status === 429) {
                errorTitle = t('errorToManyRequest');
                errorMessage = t('errorToManyRequestDesc');
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

    const handleResendEmail = () => {
        if (countdown === 0) {
            handleForgotPassword();
        }
    };

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter' && email && !isLoading && countdown === 0) {
            if (isEmailSent) {
                handleResendEmail();
            } else {
                handleForgotPassword();
            }
        }
    };

    return (
        <>
            <div className="flex flex-col mt-8 max-w-[99%] justify-center items-center">
                <div className="flex justify-center items-center lg:w-5/6 mt-8">
                    <div className="flex flex-1 items-center justify-center p-6">
                        <div className="w-full max-w-md">
                            {!isEmailSent ? (
                                <>
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <h1 className="text-2xl font-bold"> {t('title')} </h1>
                                            <p className="text-gray-500 text-sm mt-1">{t('desc')}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-lg justify-center">
                                                <Image
                                                    src="/airisto.png"
                                                    alt="Airisto logo"
                                                    width={50}
                                                    height={38}
                                                    priority
                                                />
                                            </div>
                                            <h1 className="text-header3 font-bold font-onest tracking-widest">Airisto</h1>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                {t('email')}
                                            </label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="abc@email.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                disabled={isLoading}
                                                className="w-full"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            onClick={handleForgotPassword}
                                            disabled={isLoading || !email}
                                            className="w-full bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? (
                                                <InlineLoader text="Gönderiliyor..." className="text-white flex items-center gap-4" />
                                            ) : (
                                                <>
                                                    <Mail className="w-4 h-4 mr-2" />
                                                    {t('send')}
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
                                </>
                            ) : (
                                <div className="text-center">
                                    <div className="flex justify-center mb-6">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                            <Mail className="w-8 h-8 text-green-600" />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mb-6">
                                        <div className="w-full text-center">
                                            <h1 className="text-2xl font-bold">{t('emailSend')}</h1>
                                            <div>
                                                <p className="text-gray-500 text-sm mt-1">
                                                    {currentLang.value === 'tr' ? (
                                                        <div>
                                                            <span className="font-medium">{email}</span> adresine şifre sıfırlama bağlantısı gönderdik
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            We have sent a password reset link to <span className="font-medium">{email}</span>
                                                        </div>
                                                    )}

                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                                                </div>
                                                <div className="ml-3 text-left">
                                                    <h3 className="text-sm font-medium text-blue-800">
                                                        {t('checkEmail')}
                                                    </h3>
                                                    <div className="mt-1 text-sm text-blue-700">
                                                        <p>{t('checkEmailDesc')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={handleResendEmail}
                                            disabled={countdown > 0 || isLoading}
                                            variant="outline"
                                            className="w-full py-6"
                                        >
                                            {isLoading ? (
                                                <InlineLoader text="Gönderiliyor..." className="flex items-center gap-4" />
                                            ) : countdown > 0 ? (
                                                <>
                                                    <Clock className="w-4 h-4 mr-2" />
                                                    {t('sendAgain')} ({countdown}s)
                                                </>
                                            ) : (
                                                <>
                                                    <Mail className="w-4 h-4 mr-2" />
                                                    {t('sendAgain2')}
                                                </>
                                            )}
                                        </Button>

                                        <div className="text-center mt-6 space-y-2">
                                            <p className="text-sm text-gray-600">
                                                {t('didntGetEmail')} {" "}
                                                <button
                                                    onClick={() => {
                                                        setIsEmailSent(false);
                                                        setEmail("");
                                                        setCountdown(0);
                                                    }}
                                                    className="text-fuchsia-600 hover:text-fuchsia-500 font-medium"
                                                >
                                                    {t('tryDifferentEmail')}
                                                </button>
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <Link href="/sign-in" className="text-fuchsia-600 hover:text-fuchsia-500 font-medium">
                                                    {t('backToLogin')}
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Toaster />
        </>
    );
}