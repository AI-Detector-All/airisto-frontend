"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useEffect, useMemo } from "react";
import { Globe, Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetTitle
} from "./ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useTranslate } from "@/locales";
import { usePathname } from "next/navigation";

export default function Header() {
    const [activeSection, setActiveSection] = useState("home");
    const [isMounted, setIsMounted] = useState(false);
    const { user, logout } = useAuth();
    const { t, onChangeLang, currentLang } = useTranslate('header');
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const nav_links = useMemo(() => {
        return isMounted ? [
            { name: t('home'), id: "home" },
            { name: t('features'), id: "features" },
            { name: t('howitworks'), id: "how-it-works" },
            { name: t('pricing'), id: "pricing" },
            { name: t('faq'), id: "faq" }
        ] : [
            { name: "Home", id: "home" },
            { name: "Features", id: "features" },
            { name: "How It Works", id: "how-it-works" },
            { name: "Pricing", id: "pricing" },
            { name: "FAQ", id: "faq" }
        ];
    }, [isMounted, t]);

    const handleLanguageChange = (lang: string) => {
        onChangeLang(lang);
    };

    const languageMap = {
        en: { label: "English", flag: "🇬🇧" },
        tr: { label: "Türkçe", flag: "🇹🇷" }
    };

    const currentLanguageInfo = isMounted
        ? (languageMap[currentLang?.value as keyof typeof languageMap] || languageMap.en)
        : languageMap.tr;

    useEffect(() => {
        const handleScroll = () => {
            const scrollMargin = 120;
            const scrollPosition = window.scrollY;

            let currentSectionId = nav_links[0].id;

            for (let i = 0; i < nav_links.length; i++) {
                const section = document.getElementById(nav_links[i].id);
                if (section) {
                    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
                    if (scrollPosition + scrollMargin >= sectionTop) {
                        currentSectionId = nav_links[i].id;
                    }
                }
            }

            setActiveSection(currentSectionId);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [nav_links]);

    return (
        <header className="w-full flex justify-between items-center p-4 px-16 border-b border-b-border sticky left-0 top-0 bg-white z-50">
            <Link href="/" className="flex justify-start items-center gap-4 w-full">
                <Image
                    src="/airisto-v2.png"
                    alt="Next.js logo"
                    width={150}
                    height={30}
                    priority
                    className="lg:ml-24"
                />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-8 justify-center items-center w-full">
                {nav_links.map((link) => (
                    <div key={link.id} className="relative flex flex-col items-center">
                        <Link
                            href={`/#${link.id}`}
                            className={`text-body2 font-semibold font-onest relative transition-colors duration-300 hover:text-fuchsia-400 
                            ${activeSection === link.id && pathname === `/` ? 'text-fuchsia-400' : 'text-gray-600'}`}
                            onClick={() => setActiveSection(link.id)}
                        >
                            {link.name}
                        </Link>
                        {activeSection === link.id && pathname === `/` && (
                            <div className="w-1 h-1 bg-fuchsia-400 rounded-full mt-1 absolute -bottom-2" />
                        )}
                    </div>
                ))}
            </div>

            {/* Desktop Login Button */}
            <div className="hidden lg:flex justify-end lg:gap-4 w-full">
                <div className="flex items-center space-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2 text-sm font-medium">
                                <Globe className="w-4 h-4" />
                                {currentLanguageInfo.flag} {isMounted ? (currentLang?.value?.toUpperCase() || 'EN') : 'EN'}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                                🇬🇧 English
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleLanguageChange('tr')}>
                                🇹🇷 Türkçe
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {user ? (
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button className="bg-fuchsia-400 hover:bg-fuchsia-500 text-body2 font-semibold font-onest text-white transition-all duration-300 transform hover:scale-105">
                                {isMounted ? t('panel') : 'Panel'}
                            </Button>
                        </Link>
                        <Button
                            onClick={logout}
                            className="bg-fuchsia-400 hover:bg-fuchsia-500 text-body2 font-semibold font-onest text-white transition-all duration-300 transform hover:scale-105"
                        >
                            {isMounted ? t('logout') : 'Logout'}
                        </Button>
                    </div>
                ) : (
                    <Link href={"/sign-in"}>
                        <Button className="bg-fuchsia-400 hover:bg-fuchsia-500 text-body2 font-semibold font-onest text-white transition-all duration-300 transform hover:scale-105">
                            {isMounted ? t('login') : 'Login'}
                        </Button>
                    </Link>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex justify-end">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-700">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">{isMounted ? t('openMenu') : 'Open Menu'}</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[80%] sm:w-[350px] py-12 p-4">
                        <SheetTitle className="text-xl font-bold font-onest">
                            {isMounted ? t('menu') : 'Menu'}
                        </SheetTitle>
                        <div className="flex flex-col h-full">
                            <div className="flex-1 flex flex-col gap-6 mt-8">
                                {nav_links.map((link) => (
                                    <SheetClose asChild key={link.id}>
                                        <Link
                                            href={`#${link.id}`}
                                            className={`text-lg font-semibold font-onest relative transition-colors duration-300 hover:text-fuchsia-400 
                                            ${activeSection === link.id ? 'text-fuchsia-400' : 'text-gray-600'}`}
                                            onClick={() => setActiveSection(link.id)}
                                        >
                                            {link.name}
                                        </Link>
                                    </SheetClose>
                                ))}
                                <div className="flex items-center space-x-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="flex items-center gap-2 text-sm font-medium">
                                                <Globe className="w-4 h-4" />
                                                {currentLanguageInfo.flag} {currentLang?.value?.toUpperCase() || 'EN'}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                                                🇬🇧 English
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleLanguageChange('tr')}>
                                                🇹🇷 Türkçe
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-200">
                                <SheetClose asChild>
                                    <Link href={"/sign-in"} className="w-full block">
                                        <Button className="w-full bg-fuchsia-400 hover:bg-fuchsia-500 text-body2 font-semibold font-onest text-white transition-all duration-300">
                                            {isMounted ? t('login') : 'Login'}
                                        </Button>
                                    </Link>
                                </SheetClose>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}