'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Bot, FileCheck, BarChart3, ArrowLeft, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signUp } from "@/services/auth";
import { useRouter } from "next/navigation";
import { CheckedState } from "@radix-ui/react-checkbox";

export default function Page() {
    const [userData, setUserData] = useState({
        email: '',
        name: '',
        surname: '',
        password: '',
        provider: 'LOCAL',
        isActive: false,
    });
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            router.push('/dashboard');
        }
    }, [])

    const handleUserChange = (field: string, value: string | boolean) => {
        setUserData({ ...userData, [field]: value });
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSignup = async() => {
        if (!acceptTerms) {
            alert('Lütfen kullanım şartlarını kabul edin');
            return;
        }
        
        const response = await signUp(userData);
        
        if (response) {
            router.push(`/verify-email?token=${response.emailVerificationToken}&email=${response.authResponse.user.email}`);
        }
    }

    const handleTermsChange = (checked: CheckedState) => {
        if (checked === 'indeterminate') {
            setAcceptTerms(false);
        } else {
            setAcceptTerms(checked);
        }
    };

    return (
        <div className="flex flex-col mt-8 w-full justify-center items-center">
            <div className="w-full flex justify-start items-start ml-8">
                <Link href="/" className="flex gap-2">
                    <ArrowLeft className="h-5 w-5" />
                    <h1 className="text-body2 font-onest font-bold text-gray-700"> Airisto </h1>
                </Link>
            </div>
            {/* Main container */}
            <div className="flex justify-center items-center lg:w-5/6 mt-16">
                {/* Left side - Gradient Background with Content */}
                <div className="hidden md:flex w-1/2 bg-gradient-to-b from-fuchsia-100 to-gray-900 flex-col items-center justify-center text-white relative p-8 rounded-xl">
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-24 h-24 rounded-lg bg-fuchsia-600/20 border border-fuchsia-600/50 flex items-center justify-center mb-4">
                            <Image
                                src="/airisto.png"
                                alt="Airisto logo"
                                width={50}
                                height={38}
                                priority
                            />
                        </div>

                        <div className="text-center mt-8 mb-8">
                            <Badge variant="outline" className="bg-white/10 hover:bg-white/20 text-sm rounded-full mb-8 px-6 py-1 border-fuchsia-300/30">
                                Yapay Zeka ile Ortaya Çıkarın
                            </Badge>
                            <h2 className="text-2xl font-bold mb-2">Yapay Zeka Tarafından Oluşturulan İçeriği Tespit Etmek için</h2>
                            <h2 className="text-2xl font-bold mb-6">En Hızlı ve En Kolay Yol</h2>
                            <p className="text-sm text-gray-200 mb-8">
                                Yapay zeka üretimi metinleri % doğrulukla tespit edin. Analiz, gerekçeler ve güvenilir sonuçlar tek adımda.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-start p-3 bg-white/5 rounded-lg backdrop-blur-sm">
                                        <div className="mr-3 text-fuchsia-300">
                                            {feature.icon}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-medium text-sm">{feature.title}</h3>
                                            <p className="text-xs text-gray-300">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex space-x-4 mb-8">
                                <div className="flex items-center text-xs">
                                    <CheckCircle className="h-4 w-4 mr-1 text-success-400" />
                                    <span>Yapay Zekayı Tespit Et</span>
                                </div>
                                <div className="flex items-center text-xs">
                                    <CheckCircle className="h-4 w-4 mr-1 text-success-400" />
                                    <span> İstediğiniz zaman iptal edebilirsiniz </span>
                                </div>
                            </div>

                            <Button variant="outline" className="bg-transparent border border-white text-white hover:bg-white/10 hover:text-white rounded-lg">
                                <Link href={'/#how-it-works'}> <span className="mr-2">Nasıl çalıştığını görün</span> </Link>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 3.33325V12.6666" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12.6667 7.99992L8.00008 12.6666L3.33341 7.99992" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right side - Signup Form */}
                <div className="flex flex-1 items-center justify-center p-6">
                    <div className="w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-2xl font-bold">Hesap Oluşturun</h1>
                                <p className="text-gray-500 text-sm mt-1">Başlamak için hesabınızı oluşturun</p>
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
                                <h1 className="text-header3 font-bold font-onest tracking-widest ">Airisto</h1>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Adınızı girin"
                                        value={userData.name}
                                        onChange={(e) => handleUserChange("name", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
                                    <Input
                                        id="surname"
                                        type="text"
                                        placeholder="Soyadınızı girin"
                                        value={userData.surname}
                                        onChange={(e) => handleUserChange('surname', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Emailinizi girin"
                                    value={userData.email}
                                    onChange={(e) => handleUserChange('email', e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Şifrenizi girin"
                                    value={userData.password}
                                    onChange={(e) => handleUserChange('password', e.target.value)}
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="terms"
                                    checked={acceptTerms}
                                    onCheckedChange={handleTermsChange}
                                />
                                <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                                    <Link href="/terms" className="text-fuchsia-600 hover:text-fuchsia-500">Kullanım Şartları</Link>&apos;nı ve <Link href="/privacy" className="text-fuchsia-600 hover:text-fuchsia-500">Gizlilik Politikası</Link>&apos;nı kabul ediyorum
                                </label>
                            </div>

                            <Button
                                type="submit"
                                onClick={handleSignup}
                                className="w-full bg-gradient-to-r from-fuchsia-500 to-magenta-500 hover:from-fuchsia-600 hover:to-magenta-600 text-white py-6"
                                disabled={!acceptTerms}
                            >
                                Hesap Oluştur
                            </Button>

                            <div className="text-center mt-4">
                                <p className="text-sm text-gray-600">
                                    Zaten hesabınız var mı? <Link href="/sign-in" className="text-fuchsia-600 hover:text-fuchsia-500 font-medium">Giriş yapın</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const features = [
    {
        icon: <Shield className="h-5 w-5" />,
        title: "Gelişmiş Tespit",
        description: "%85'lik doğruluk oranıyla yapay zeka destekli analiz"
    },
    {
        icon: <Bot className="h-5 w-5" />,
        title: "Çoklu Model Desteği",
        description: "ChatGPT, Gemini ve daha fazlasından gelen içeriği algılar"
    },
    {
        icon: <FileCheck className="h-5 w-5" />,
        title: "Dosya Uyumluluğu",
        description: "txt, docx, pdf ve diğer belge formatlarını analiz edin"
    },
    {
        icon: <BarChart3 className="h-5 w-5" />,
        title: "Detaylı Raporlar",
        description: "Tespit edilen içerikle ilgili kapsamlı analizler alın"
    }
];