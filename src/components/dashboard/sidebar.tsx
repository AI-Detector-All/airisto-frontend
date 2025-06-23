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
        href: "/dashboard/settings",
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
                    "hidden lg:flex flex-col h-screen bg-slate-50 border-r border-slate-200 transition-all duration-300 fixed left-0 top-0 z-30",
                    isCollapsed ? "w-16" : "w-64",
                    className
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200">
                    {!isCollapsed && (
                        <div className="h-16 w-32 rounded-lg justify-center mt-2">
                            <Image
                                src="/airisto-v2.png"
                                alt="Airisto logo"
                                width={180}
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
                <nav className="flex-1 p-4">
                    <ul className="space-y-1">
                        {filteredSidebarItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center rounded-lg p-3 text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-600 transition-colors",
                                        isLinkActive(item.href) && "bg-fuchsia-50 text-fuchsia-600"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "h-5 w-5",
                                        isCollapsed ? "mx-auto" : "mr-3"
                                    )} />
                                    {!isCollapsed && (
                                        <span className="font-medium">{t(item.name)}</span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom Items */}
                <div className="border-t border-slate-200 p-4">
                    <ul className="space-y-1">
                        {filteredBottomItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center rounded-lg p-3 text-gray-700 hover:bg-slate-100 transition-colors",
                                        isLinkActive(item.href) && "bg-blue-500 text-white"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "h-5 w-5",
                                        isCollapsed ? "mx-auto" : "mr-3"
                                    )} />
                                    {!isCollapsed && (
                                        <span className="font-medium">{t(item.name)}</span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Mobile Sidebar */}
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