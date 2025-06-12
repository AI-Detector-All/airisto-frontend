'use client'
import Link from "next/link";
// import DarkModeToggle from "../dark-mode-toggle";
import { UserAvatar } from "./user-avatar";
import { Progress } from "../ui/progress";
import { Globe, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { InlineLoader } from "../ui/global-loader";
import { useTranslate } from "@/locales";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export default function DashboardHeader() {
    const { t, onChangeLang, currentLang } = useTranslate('dashboard-hs');
    const { user, isLoading, isAuthenticated, getTokenUsage } = useAuth();
    const { used, total, percentage } = getTokenUsage();

    const handleLanguageChange = (lang: string) => {
        onChangeLang(lang);
    };

    const languageMap = {
        en: { label: "English", flag: "EN" },
        tr: { label: "Türkçe", flag: "TR" }
    };

    const currentLanguageInfo = (languageMap[currentLang?.value as keyof typeof languageMap] || languageMap.en)

    if (isLoading) {
        return <InlineLoader size="sm" />;
    }

    if (!isAuthenticated || !user) {
        return <div>Please login to continue</div>;
    }

    return (
        <header className="backdrop-blur-sm border-b border-border">
            <div className="container mx-auto ">
                <div className="flex h-16 items-center justify-between">

                    {/* <SearchInput width="max-w-[800px]" /> */}
                    <div></div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <nav>
                            <div className="space-x-4 space-y-2">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center">
                                        <Zap className="h-4 w-4 text-purple-500 mr-2 " />
                                        <span className="text-sm font-medium"> {t('usedToken')} </span>
                                    </div>
                                    <span className="text-sm text-gray-500">{used} / {total}</span>
                                </div>
                                <Progress
                                    value={percentage}
                                    className="h-2 bg-purple-100"
                                />
                            </div>
                        </nav>

                        <div className="flex items-center space-x-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-2 text-sm font-medium">
                                        <Globe className="w-4 h-4" />
                                        {currentLanguageInfo.flag}
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

                        {/* <DarkModeToggle /> */}

                        {user ? (
                            <>
                                {/* <Notification /> */}
                                <UserAvatar user={user} />
                            </>
                        ) : (
                            <Link
                                href="/"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-4 py-2"
                            >
                                {t('signIn')}
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    {/* <div className="flex md:hidden items-center gap-2">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-10 w-10">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                                <SheetHeader>
                                    <VisuallyHidden>
                                        <SheetTitle>Menu</SheetTitle>
                                    </VisuallyHidden>
                                </SheetHeader>
                                <MobileMenu user={user!} logout={logout} />
                            </SheetContent>
                        </Sheet>
                    </div> */}
                </div>
            </div>
        </header>
    );
}