'use client';

import { useTranslate } from "@/locales";
import Link from "next/link";
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram, ExternalLink, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
    const { t } = useTranslate('footer');

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="w-full bg-gradient-to-b from-gray-900 to-gray-950 text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <h3 className="text-xl font-bold">Airisto</h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {t('company_description')}
                        </p>
                        <div className="flex space-x-3">
                            <a
                                href="https://x.com/airisto"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-gray-800 hover:bg-primary/80 rounded-lg flex items-center justify-center transition-colors"
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a
                                href="https://linkedin.com/company/airisto"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-gray-800 hover:bg-primary/80 rounded-lg flex items-center justify-center transition-colors"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a
                                href="https://instagram.com/airisto"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-gray-800 hover:bg-primary/80 rounded-lg flex items-center justify-center transition-colors"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">{t('quick_links.title')}</h4>
                        <ul className="space-y-3">
                            <li>
                                <button
                                    onClick={() => scrollToSection('features')}
                                    className="text-gray-300 hover:text-white text-sm transition-colors hover:underline"
                                >
                                    {t('quick_links.features')}
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('pricing')}
                                    className="text-gray-300 hover:text-white text-sm transition-colors hover:underline"
                                >
                                    {t('quick_links.pricing')}
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('how-it-works')}
                                    className="text-gray-300 hover:text-white text-sm transition-colors hover:underline"
                                >
                                    {t('quick_links.how_it_works')}
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('faq')}
                                    className="text-gray-300 hover:text-white text-sm transition-colors hover:underline"
                                >
                                    {t('quick_links.faq')}
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">{t('company.title')}</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/about-us"
                                    className="text-gray-300 hover:text-white text-sm transition-colors hover:underline"
                                >
                                    {t('company.about_us')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-300 hover:text-white text-sm transition-colors hover:underline"
                                >
                                    {t('company.contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">{t('contact_info.title')}</h4>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-300 text-sm">{t('contact_info.email_label')}</p>
                                    <a
                                        href="mailto:ainonceai@gmail.com"
                                        className="text-white text-sm hover:text-primary transition-colors"
                                    >
                                        ainonceai@gmail.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-300 text-sm">{t('contact_info.phone_label')}</p>
                                    <a
                                        href="tel:+902345678900"
                                        className="text-white text-sm hover:text-primary transition-colors"
                                    >
                                        +90 538 586 69 44
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800"></div>

            <div className="container mx-auto px-6 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                        <p className="text-gray-400 text-sm">
                            {t('copyright')}
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <Link
                                href="/privacy"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                {t('legal.privacy')}
                            </Link>
                            <Link
                                href="/terms"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                {t('legal.terms')}
                            </Link>
                            <Link
                                href="/cookies"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                {t('legal.cookies')}
                            </Link>
                        </div>
                    </div>

                    <Button
                        onClick={scrollToTop}
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white hover:border-gray-500"
                    >
                        <ArrowUp className="w-4 h-4 mr-2" />
                        {t('back_to_top')}
                    </Button>
                </div>
            </div>
        </footer>
    );
}