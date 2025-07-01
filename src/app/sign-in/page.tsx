'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Bot, FileCheck, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user-context";
import { getCookie } from "@/utils/cookie";
import { InlineLoader } from "@/components/ui/global-loader";
import { useTranslate } from "@/locales";
import { Toaster } from "@/components/ui/sonner";

export default function Page() {
    const { t } = useTranslate('sign-in');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()
    const { setUser } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = getCookie('access_token');
        if (token) {
            router.push('/dashboard');
        }
    }, [router])

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await signIn(email, password);

            setUser(response.user);

            toast.success(`${t('welcome')}, ${response.user?.name || response.user?.email || 'Kullanıcı'}! 🎉`, {
                description: t('redirectToDashboard'),
                duration: 2000,
                style: {
                    background: '#10b981',
                    color: '#ffffff',
                    border: 'none'
                }
            });

            setIsLoading(false);

            setTimeout(() => {
                router.push('/dashboard');
            }, 2000);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Login failed:', error);
            setIsLoading(false);

            let errorMessage = t('errorDesc');
            let errorTitle = t('errorTitle');

            if (error?.response?.status === 401) {
                errorTitle = t('errorInvalidSignIn');
                errorMessage = t('errorInvalidSignInDesc');
            } else if (error?.response?.status === 429) {
                errorTitle = t('errorToManyRequests');
                errorMessage = t('errorToManyRequestsDesc');
            } else if (error?.response?.status >= 500) {
                errorTitle = t('errorServer');
                errorMessage = t('errorServerDesc');
            } else if (!navigator.onLine) {
                errorTitle = t('errorNavigator');
                errorMessage = t('errorNavigatorDesc');
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
    }

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter' && email && password && !isLoading) {
            handleLogin();
        }
    }

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
                <div className="flex justify-center p-4 xl:p-0 items-center w-full lg:w-3/4 xl:min-w-[1250px] 2xl:min-w-7xl h-screen">
                    {/* Tek büyük kart - hem sol hem sağ tarafı kapsıyor */}
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
                                    <p className="text-sm lg:text-base xl:text-lg text-gray-200 mb-8">
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

                        {/* Right side - Login Form */}
                        <div className="flex flex-1 items-center justify-center p-6">
                            <div className="w-full max-w-md">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h1 className="text-2xl font-bold">{t('signInTitle')}</h1>
                                        <p className="text-gray-500 text-sm mt-1">{t('welcomeBack')}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-16 w-32 rounded-lg justify-center mt-2">
                                            <Image
                                                src="/airisto-v2.png"
                                                alt="Next.js logo"
                                                width={150}
                                                height={38}
                                                priority
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('emailLabel')}</label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder={t('emailPlaceholder')}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            disabled={isLoading}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">{t('passwordLabel')}</label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder={t('passwordPlaceholder')}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            disabled={isLoading}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Checkbox id="remember" disabled={isLoading} />
                                            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">{t('rememberMe')}</label>
                                        </div>
                                        <a href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-500">{t('forgotPassword')}</a>
                                    </div>

                                    <Button
                                        type="submit"
                                        onClick={handleLogin}
                                        disabled={isLoading || !email || !password}
                                        className="w-full bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? <InlineLoader text={t('signingIn')} className="text-white flex items-center gap-4" /> : t('signInButton')}
                                    </Button>
                                    <div className="text-center mt-4">
                                        <p className="text-sm text-gray-600">
                                            {t('noAccount')} <Link href="/sign-up" className="text-fuchsia-600 hover:text-fuchsia-500 font-medium">{t('signUpLink')}</Link>
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