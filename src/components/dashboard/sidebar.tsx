"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    FileText,
    Search,
    ChevronLeft,
    ChevronRight,
    Settings,
    LifeBuoy,
    Building2,
    UserRound,
    X
} from "lucide-react";
import Image from 'next/image';
import { RolesEnum } from '@/enums/roles';
import { useTranslate } from '@/locales';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    isCollapsed?: boolean;
    toggleSidebar?: () => void;
    userRole?: RolesEnum;
    isMobileOpen?: boolean;
    closeMobileSidebar?: () => void;
}

const baseSidebarItems = [
    {
        name: "home",
        icon: LayoutDashboard,
        href: "/dashboard",
        roles: [RolesEnum.USER, RolesEnum.ADMIN, RolesEnum.INSTITUTION_ADMIN, RolesEnum.ACADEMICIAN, RolesEnum.STUDENT]
    },
    {
        name: "documents",
        icon: FileText,
        href: "/dashboard/documents",
        roles: [RolesEnum.USER, RolesEnum.ADMIN, RolesEnum.INSTITUTION_ADMIN, RolesEnum.ACADEMICIAN, RolesEnum.STUDENT]
    },
    {
        name: "aiDetectorTitle",
        icon: Search,
        href: "/dashboard/ai-detector",
        roles: [RolesEnum.USER, RolesEnum.ADMIN, RolesEnum.INSTITUTION_ADMIN, RolesEnum.ACADEMICIAN, RolesEnum.STUDENT]
    },
    {
        name: "users",
        icon: UserRound,
        href: "/dashboard/users",
        roles: [RolesEnum.INSTITUTION_ADMIN]
    },
    {
        name: "allUsers",
        icon: UserRound,
        href: "/dashboard/all-users",
        roles: [RolesEnum.ADMIN]
    },
    {
        name: "allCorporates",
        icon: Building2,
        href: "/dashboard/corporate",
        roles: [RolesEnum.ADMIN]
    },
];

const bottomItems = [
    {
        name: "support",
        icon: LifeBuoy,
        href: "/dashboard/support",
        roles: [RolesEnum.USER, RolesEnum.ADMIN, RolesEnum.INSTITUTION_ADMIN, RolesEnum.ACADEMICIAN, RolesEnum.STUDENT]
    },
    {
        name: "settings",
        icon: Settings,
        href: "/dashboard/profile",
        roles: [RolesEnum.USER, RolesEnum.ADMIN, RolesEnum.INSTITUTION_ADMIN, RolesEnum.ACADEMICIAN, RolesEnum.STUDENT]
    }
];

export default function DashboardSidebar({
    className,
    isCollapsed: parentIsCollapsed,
    toggleSidebar: parentToggleSidebar,
    userRole = RolesEnum.USER,
    isMobileOpen = false,
    closeMobileSidebar,
}: SidebarProps) {
    const { t } = useTranslate('dashboard-hs');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (parentIsCollapsed !== undefined) {
            setIsCollapsed(parentIsCollapsed);
        }
    }, [parentIsCollapsed]);

    const toggleSidebar = () => {
        if (parentToggleSidebar) {
            parentToggleSidebar();
        } else {
            setIsCollapsed(!isCollapsed);
        }
    };

    const isLinkActive = (href: string) => {
        if (href === '/dashboard') {
            return pathname === '/dashboard';
        }
        return pathname.startsWith(href);
    };

    const handleMobileLinkClick = () => {
        if (closeMobileSidebar) {
            closeMobileSidebar();
        }
    };

    // Kullanıcının rolüne göre menü öğelerini filtrele
    const filteredSidebarItems = baseSidebarItems.filter(item =>
        item.roles.includes(userRole)
    );

    const filteredBottomItems = bottomItems.filter(item =>
        item.roles.includes(userRole)
    );

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={closeMobileSidebar}
                />
            )}

            {/* Desktop Sidebar */}
            <div
                className={cn(
                    "hidden lg:flex flex-col h-screen bg-slate-50 border-r border-slate-200 transition-all duration-300 fixed left-0 top-0 z-99",
                    isCollapsed ? "w-24" : "w-64",
                    className
                )}
            >
                {/* Header */}
                <div className={`flex items-center border-b border-slate-200 ${isCollapsed ? "justify-center px-2 py-4" : "justify-between px-4 py-2"}`}>
                    {isCollapsed ? (
                        <div
                            onClick={toggleSidebar}
                            className="w-12 h-12 flex items-center justify-center">
                            <Image
                                src="/icon-dark.ico"
                                alt="Airisto"
                                width={24}
                                height={24}
                                priority
                                className="text-white"
                            />
                        </div>
                    ) : (
                        <div className="rounded-lg justify-center mt-1.5">
                            <Image
                                src="/airisto-v2.png"
                                alt="Airisto logo"
                                width={150}
                                height={38}
                                priority
                            />
                        </div>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                        className="h-8 w-8"
                    >
                        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>
                </div>


                {/* Navigation */}
                <nav className={cn("flex-1", isCollapsed ? "px-2 py-6" : "p-4")}>
                    <ul className={cn("space-y-1", isCollapsed && "space-y-3")}>
                        {filteredSidebarItems.map((item) => (
                            <li key={item.name}>
                                {isCollapsed ? (
                                    // Collapsed durumda tooltip ile merkezi butonlar
                                    <div className="group relative">
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center justify-center w-12 h-12 rounded-xl text-gray-600 hover:bg-fuchsia-50 hover:text-fuchsia-600 transition-all duration-200 mx-auto border border-transparent hover:border-fuchsia-100",
                                                isLinkActive(item.href) && "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100 shadow-sm"
                                            )}
                                        >
                                            <item.icon className="h-5 w-5" />
                                        </Link>
                                        {/* Tooltip */}
                                        <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 top-1/2 -translate-y-1/2 pointer-events-none">
                                            {t(item.name)}
                                            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center rounded-lg p-3 text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-600 transition-colors",
                                            isLinkActive(item.href) && "bg-fuchsia-50 text-fuchsia-600"
                                        )}
                                    >
                                        <item.icon className="h-5 w-5 mr-3" />
                                        <span className="font-medium">{t(item.name)}</span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom Items */}
                <div className={cn("border-t border-slate-200", isCollapsed ? "px-2 py-4" : "p-4")}>
                    <ul className="space-y-2">
                        {filteredBottomItems.map((item) => (
                            <li key={item.name}>
                                {isCollapsed ? (
                                    <div className="group relative">
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center justify-center w-12 h-12 rounded-lg text-gray-700 hover:bg-slate-100 transition-colors mx-auto",
                                                isLinkActive(item.href) && "bg-blue-500 text-white"
                                            )}
                                        >
                                            <item.icon className="h-5 w-5" />
                                        </Link>
                                        {/* Tooltip */}
                                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 top-1/2 -translate-y-1/2">
                                            {t(item.name)}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center rounded-lg p-3 text-gray-700 hover:bg-slate-100 transition-colors",
                                            isLinkActive(item.href) && "bg-blue-500 text-white"
                                        )}
                                    >
                                        <item.icon className="h-5 w-5 mr-3" />
                                        <span className="font-medium">{t(item.name)}</span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Mobile Sidebar - Değişiklik yok */}
            <div
                className={cn(
                    "lg:hidden fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transition-transform duration-300",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="h-16 w-32 rounded-lg justify-center mt-2">
                        <Image
                            src="/airisto-v2.png"
                            alt="Airisto logo"
                            width={180}
                            height={38}
                            priority
                        />
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={closeMobileSidebar}
                        className="h-8 w-8"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-1">
                        {filteredSidebarItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    onClick={handleMobileLinkClick}
                                    className={cn(
                                        "flex items-center rounded-lg p-3 text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-600 transition-colors",
                                        isLinkActive(item.href) && "bg-fuchsia-50 text-fuchsia-600"
                                    )}
                                >
                                    <item.icon className="h-5 w-5 mr-3" />
                                    <span className="font-medium">{t(item.name)}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom Items */}
                <div className="border-t border-gray-200 p-4">
                    <ul className="space-y-1">
                        {filteredBottomItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    onClick={handleMobileLinkClick}
                                    className={cn(
                                        "flex items-center rounded-lg p-3 text-gray-700 hover:bg-gray-100 transition-colors",
                                        isLinkActive(item.href) && "bg-blue-500 text-white"
                                    )}
                                >
                                    <item.icon className="h-5 w-5 mr-3" />
                                    <span className="font-medium">{t(item.name)}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}