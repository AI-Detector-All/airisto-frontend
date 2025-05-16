"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

const nav_links = [
    {
        name: "Ana Sayfa",
        id: "home"
    },
    {
        name: "Hakkımızda",
        id: "about"
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
    
    useEffect(() => {
        const handleScroll = () => {
            const sections = nav_links.map(link => document.getElementById(link.id));
            const scrollPosition = window.scrollY + 100;
            
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(nav_links[i].id);
                    break;
                }
            }
        };
        
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className="w-full flex justify-between items-center p-4 border-b border-b-border sticky left-0 top-0 bg-white z-50">
            <div className="w-full flex justify-center items-center gap-4">
                <Image
                    src="/favicon.ico"
                    alt="Next.js logo"
                    width={50}
                    height={38}
                    priority
                />
                <h1 className="text-header3 font-bold font-onest tracking-widest ">Airisto</h1>
            </div>
            
            <div className="w-full flex gap-8 justify-center items-center">
                {nav_links.map((link) => (
                    <div key={link.id} className="relative flex flex-col items-center ">
                        <Link 
                            href={`#${link.id}`} 
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
            
            <div className="w-full flex gap-4 justify-center">
                <Link href={"/sign-in"}>
                    <Button className="bg-fuchsia-400 hover:bg-fuchsia-500 text-body2 font-semibold font-onest text-white transition-all duration-300 transform hover:scale-105">
                        Giriş
                    </Button>
                </Link>
                {/* <Link href={"/sign-up"}>
                    <Button variant="outline" className="border-fuchsia-400 text-fuchsia-400 text-body2 font-semibold font-onest transition-all duration-300 transform hover:scale-105 hover:border-fuchsia-500 hover:text-fuchsia-500">
                        Kayıt Ol
                    </Button>
                </Link> */}
            </div>
        </header>
    );
}