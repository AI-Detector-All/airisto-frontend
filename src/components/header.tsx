"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetTitle
} from "./ui/sheet";
import { useAuth } from "@/hooks/useAuth";

const nav_links = [
    {
        name: "Ana Sayfa",
        id: "home"
    },
    {
        name: "Özellikler",
        id: "features"
    },
    {
        name: "Nasıl Çalışır",
        id: "how-it-works"
    },
    {
        name: "Ücretlendirme",
        id: "pricing"
    },
    {
        name: "SSS",
        id: "faq"
    }
];

export default function Header() {
    const [activeSection, setActiveSection] = useState("home");
    const { user, logout } = useAuth();

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
    }, []);

    return (
        <header className="w-full flex justify-between items-center p-4 px-16 border-b border-b-border sticky left-0 top-0 bg-white z-50">
            <Link href="/" className="flex justify-start items-center gap-4">
                <Image
                    src="/airisto.png"
                    alt="Next.js logo"
                    width={50}
                    height={38}
                    priority
                    className=""
                />
                <h1 className="text-header3 font-bold font-onest tracking-widest">Airisto</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-8 justify-center items-center">
                {nav_links.map((link) => (
                    <div key={link.id} className="relative flex flex-col items-center">
                        <Link
                            href={`/#${link.id}`}
                            className={`text-body2 font-semibold font-onest relative transition-colors duration-300 hover:text-fuchsia-400 
                            ${activeSection === link.id ? 'text-fuchsia-400' : 'text-gray-600'}`}
                            onClick={() => setActiveSection(link.id)}
                        >
                            {link.name}
                        </Link>
                        {activeSection === link.id && (
                            <div className="w-1 h-1 bg-fuchsia-400 rounded-full mt-1 absolute -bottom-2" />
                        )}
                    </div>
                ))}
            </div>

            {/* Desktop Login Button */}
            <div className="hidden lg:flex justify-end">
                {user ? (
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                        >
                            <Button className="bg-fuchsia-400 hover:bg-fuchsia-500 text-body2 font-semibold font-onest text-white transition-all duration-300 transform hover:scale-105">
                                Panel
                            </Button>
                        </Link>
                        <Button
                            onClick={logout}
                            className="bg-fuchsia-400 hover:bg-fuchsia-500 text-body2 font-semibold font-onest text-white transition-all duration-300 transform hover:scale-105"
                        >
                            Çıkış
                        </Button>
                    </div>
                ) : (
                    <Link href={"/sign-in"}>
                        <Button className="bg-fuchsia-400 hover:bg-fuchsia-500 text-body2 font-semibold font-onest text-white transition-all duration-300 transform hover:scale-105">
                            Giriş
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
                            <span className="sr-only">Menüyü Aç</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[80%] sm:w-[350px] py-12 p-4">
                        <SheetTitle className="text-xl font-bold font-onest">Menü</SheetTitle>
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
                            </div>
                            <div className="pt-6 border-t border-gray-200">
                                <SheetClose asChild>
                                    <Link href={"/sign-in"} className="w-full block">
                                        <Button className="w-full bg-fuchsia-400 hover:bg-fuchsia-500 text-body2 font-semibold font-onest text-white transition-all duration-300">
                                            Giriş
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