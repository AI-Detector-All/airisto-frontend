'use client'
import Link from "next/link";
// import DarkModeToggle from "../dark-mode-toggle";
import { UserAvatar } from "./user-avatar";
import { Progress } from "../ui/progress";
import { Globe, Zap, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { InlineLoader } from "../ui/global-loader";
import { useTranslate } from "@/locales";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useSubscription } from "@/hooks/useSubscription";

interface DashboardHeaderProps {
    toggleMobileMenu?: () => void;
    isMobileMenuOpen?: boolean;
}

export default function DashboardHeader({
    toggleMobileMenu,
    isMobileMenuOpen
}: DashboardHeaderProps) {
    const { t, onChangeLang, currentLang } = useTranslate('dashboard-hs');
    const { user, isLoading, isAuthenticated } = useAuth();
    const { subscription } = useSubscription();

    const handleLanguageChange = (lang: string) => {
        onChangeLang(lang);
    };

    const languageMap = {
        en: { label: "English", flag: "EN" },
        tr: { label: "Türkçe", flag: "TR" }
    };

    const currentLanguageInfo = (languageMap[currentLang?.value as keyof typeof languageMap] || languageMap.en)

    if (isLoading) {
        return (
            <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-center">
                <InlineLoader size="sm" />
            </header>
        );
    }

    if (!isAuthenticated || !user) {
        return (
            <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-center">
                <div>Please login to continue</div>
            </header>
        );
    }

    return (
        <header className="h-16 border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-30">
            <div className="h-full px-4 lg:px-6 flex items-center justify-between">

                {/* Sol taraf - Mobile Menu Button */}
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMobileMenu}
                        className="lg:hidden h-9 w-9"
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>

                {/* Sağ taraf - Navigation */}
                <div className="flex items-center gap-4 lg:gap-4">

                    {/* Token Usage */}
                    <div className="w-full flex items-center gap-2">
                        {/* Desktop Token Display */}
                        <div className="hidden md:flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4 text-purple-500" />
                                <span className="text-sm font-medium">{t('usedToken')}</span>
                            </div>
                            <span className="text-sm text-gray-500">{subscription?.usedAnalyses} / {subscription?.maxAnalyses}</span>
                        </div>

                        {/* Mobile Token Display */}
                        <div className="md:hidden flex items-center gap-1">
                            <Zap className="h-4 w-4 text-purple-500" />
                            <span className="text-xs text-gray-500">{subscription?.usedAnalyses}/{subscription?.maxAnalyses}</span>
                        </div>

                        {/* Progress Bar */}
                        <Progress
                            value={subscription && subscription?.maxAnalyses > 0 ? (subscription?.usedAnalyses / subscription?.maxAnalyses) * 100 : 0}
                            className="h-2 bg-purple-100 w-16 md:w-32"
                        />
                    </div>

                    {/* Language Selector */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1 h-9 px-2 lg:px-3"
                            >
                                <Globe className="w-4 h-4" />
                                <span className="hidden sm:inline text-sm">
                                    {currentLanguageInfo.flag}
                                </span>
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

                    {/* User Avatar */}
                    {user ? (
                        <UserAvatar user={user} />
                    ) : (
                        <Link
                            href="/"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors border border-gray-300 rounded-md px-3 py-1.5"
                        >
                            <span className="hidden sm:inline">{t('signIn')}</span>
                            <span className="sm:hidden">Sign In</span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}