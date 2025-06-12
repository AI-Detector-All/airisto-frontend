'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Bot, FileCheck, BarChart3, ArrowLeft, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user-context";
import { getCookie } from "@/utils/cookie";
import { InlineLoader } from "@/components/ui/global-loader";

export default function Page() {
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

            setIsLoading(false);
            router.push('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    }

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
                <div className="hidden md:flex w-1/2 bg-gradient-to-b from-blue-100 to-slate-900 flex-col items-center justify-center text-white relative p-8 rounded-xl">
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-24 h-24 rounded-lg bg-indigo-600/20 border border-indigo-600/50 flex items-center justify-center mb-4">
                            <Image
                                src="/airisto.png"
                                alt="Next.js logo"
                                width={50}
                                height={38}
                                priority
                            />
                        </div>

                        <div className="text-center mt-8 mb-8">
                            <Badge variant="outline" className="bg-white/10 hover:bg-white/20 text-sm rounded-full mb-8 px-6 py-1">
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

                            <div className="flex space-x-4 mb-8">
                                <div className="flex items-center text-xs">
                                    <CheckCircle className="h-4 w-4 mr-1 text-green-400" />
                                    <span>Yapay Zekayı Tespit Et</span>
                                </div>
                                <div className="flex items-center text-xs">
                                    <CheckCircle className="h-4 w-4 mr-1 text-green-400" />
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

                {/* Right side - Login Form */}
                <div className="flex flex-1 items-center justify-center p-6">
                    <div className="w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-2xl font-bold">Oturum Açın</h1>
                                <p className="text-gray-500 text-sm mt-1">Tekrar hoş geldiniz! Lütfen bilgilerinizi girin</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg justify-center">
                                    <Image
                                        src="/airisto.png"
                                        alt="Next.js logo"
                                        width={50}
                                        height={38}
                                        priority
                                    />
                                </div>
                                <h1 className="text-header3 font-bold font-onest tracking-widest ">Airisto</h1>

                            </div>
                        </div>

                        {/* <div className="flex flex-col gap-4 mb-6">
                            <Button variant="outline" className="w-full flex items-center justify-center gap-2 py-6">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.1711 8.36788H17.4998V8.33329H9.99984V11.6666H14.7094C14.0223 13.607 12.1761 15 9.99984 15C7.23859 15 4.99984 12.7612 4.99984 9.99996C4.99984 7.23871 7.23859 4.99996 9.99984 4.99996C11.2744 4.99996 12.4344 5.48079 13.317 6.26621L15.674 3.90913C14.1857 2.52204 12.1948 1.66663 9.99984 1.66663C5.39775 1.66663 1.6665 5.39788 1.6665 9.99996C1.6665 14.602 5.39775 18.3333 9.99984 18.3333C14.6019 18.3333 18.3332 14.602 18.3332 9.99996C18.3332 9.44121 18.2757 8.89579 18.1711 8.36788Z" fill="#FFC107" />
                                    <path d="M2.62744 6.12121L5.36536 8.12913C6.10619 6.29496 7.90036 4.99996 9.99994 4.99996C11.2745 4.99996 12.4345 5.48079 13.3171 6.26621L15.6741 3.90913C14.1858 2.52204 12.1949 1.66663 9.99994 1.66663C6.74077 1.66663 3.91327 3.47371 2.62744 6.12121Z" fill="#FF3D00" />
                                    <path d="M10 18.3333C12.1525 18.3333 14.1084 17.5095 15.5892 16.17L13.0158 13.9875C12.1513 14.6452 11.0937 15 10 15C7.83255 15 5.99213 13.6179 5.2988 11.6833L2.5725 13.7683C3.84172 16.4617 6.64922 18.3333 10 18.3333Z" fill="#4CAF50" />
                                    <path d="M18.1711 8.36796H17.5V8.33337H10V11.6667H14.7096C14.3809 12.5902 13.7889 13.3917 13.0146 13.9879L13.0158 13.9871L15.5892 16.1696C15.4088 16.3354 18.3333 14.1667 18.3333 10C18.3333 9.44129 18.2758 8.89587 18.1711 8.36796Z" fill="#1976D2" />
                                </svg>
                                <span>Google ile Oturum Açın</span>
                            </Button>
                        </div> */}
                        {/* 
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">Ya da</span>
                            </div>
                        </div> */}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Emailinizi girin"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Şifrenizi girin"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Checkbox id="remember" />
                                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Beni Hatırla</label>
                                </div>
                                <a href="#" className="text-sm text-purple-600 hover:text-purple-500">Şifremi Unuttum</a>
                            </div>

                            <Button type="submit" onClick={handleLogin} className="w-full bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white py-6">
                                {isLoading ? <InlineLoader text="Giriş Yapılıyor..." className="text-white flex items-center gap-4" /> : "Giriş Yap"}
                            </Button>
                            <div className="text-center mt-4">
                                <p className="text-sm text-gray-600">
                                    Hesabınız yok mu? <Link href="/sign-up" className="text-fuchsia-600 hover:text-fuchsia-500 font-medium">Kayıt olun</Link>
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