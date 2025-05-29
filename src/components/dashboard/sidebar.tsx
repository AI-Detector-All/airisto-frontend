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
    UserRound
} from "lucide-react";
import Image from 'next/image';
import { RolesEnum } from '@/enums/roles';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean;
  toggleSidebar?: () => void;
  userRole?: RolesEnum;
}

const baseSidebarItems = [
    {
        name: "Ana Sayfa",
        icon: LayoutDashboard,
        href: "/dashboard",
        roles: [RolesEnum.USER, RolesEnum.ADMIN, RolesEnum.INSTITUTION_ADMIN, RolesEnum.ACADEMICIAN, RolesEnum.STUDENT]
    },
    {
        name: "Dokümanlar",
        icon: FileText,
        href: "/dashboard/documents",
        roles: [RolesEnum.USER, RolesEnum.ADMIN, RolesEnum.INSTITUTION_ADMIN, RolesEnum.ACADEMICIAN, RolesEnum.STUDENT]
    },
    {
        name: "Yapay Zeka Dedektörü",
        icon: Search,
        href: "/dashboard/ai-detector",
        roles: [RolesEnum.USER, RolesEnum.ADMIN, RolesEnum.INSTITUTION_ADMIN, RolesEnum.ACADEMICIAN, RolesEnum.STUDENT]
    },
    {
        name: "Kullanıcılar",
        icon: UserRound,
        href: "/dashboard/users",
        roles: [RolesEnum.INSTITUTION_ADMIN]
    },
    {
        name: "Tüm Kullanıcılar",
        icon: UserRound,
        href: "/dashboard/all-users",
        roles: [RolesEnum.ADMIN]
    },
    {
        name: "Tüm Kurumlar",
        icon: Building2,
        href: "/dashboard/all-corporates",
        roles: [RolesEnum.ADMIN]
    },
];

const bottomItems = [
    {
        name: "Destek",
        icon: LifeBuoy,
        href: "/dashboard/support",
        roles: [RolesEnum.USER, RolesEnum.ADMIN, RolesEnum.INSTITUTION_ADMIN, RolesEnum.ACADEMICIAN, RolesEnum.STUDENT]
    },
    {
        name: "Ayarlar",
        icon: Settings,
        href: "/dashboard/settings",
        roles: [RolesEnum.USER, RolesEnum.ADMIN, RolesEnum.INSTITUTION_ADMIN, RolesEnum.ACADEMICIAN, RolesEnum.STUDENT]
    }
];

export default function DashboardSidebar({ 
  className, 
  isCollapsed: parentIsCollapsed, 
  toggleSidebar: parentToggleSidebar,
  userRole = RolesEnum.USER, // Varsayılan olarak USER rolü
  ...props 
}: SidebarProps) {
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

    // Kullanıcının rolüne göre menü öğelerini filtrele
    const filteredSidebarItems = baseSidebarItems.filter(item => 
        item.roles.includes(userRole)
    );

    const filteredBottomItems = bottomItems.filter(item => 
        item.roles.includes(userRole)
    );

    return (
        <div
            className={cn(
                "flex flex-col h-screen bg-slate-50 border-r border-slate-200 transition-all duration-300 z-40 sticky top-0",
                isCollapsed ? "w-16" : "w-64",
                className
            )}
            {...props}
        >
            <div className="flex items-center justify-between p-6 bg-slate-50 z-10">
                {!isCollapsed && (
                    <div className="flex items-center gap-4">
                        <Image
                            src="/airisto.png"
                            alt="Next.js logo"
                            width={30}
                            height={15}
                            priority
                        />
                        <h1 className="text-body font-bold font-onest tracking-wider">Airisto</h1>
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

            <nav className="flex-1 py-4">
                <ul className="space-y-1 px-4">
                    {filteredSidebarItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center rounded-md p-2 text-gray-600 hover:bg-fuchsia-50 hover:text-gray-600",
                                    "transition-all duration-200 text-body2 font-onest",
                                    isLinkActive(item.href) && "bg-fuchsia-50 text-fuchsia-400 hover:bg-fuchsia-100 hover:text-fuchsia-500"
                                )}
                            >
                                <item.icon className={`${isCollapsed ? "mx-auto" : "mr-2"} h-4 w-4 ${isLinkActive(item.href) && "text-fuchsia-400"}`} />
                                {!isCollapsed && <span className='mt-0.5'>{item.name}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="border-t border-slate-200 py-4 bg-slate-50">
                <ul className="space-y-1 px-4">
                    {filteredBottomItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center rounded-md p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                                    "transition-all duration-200 text-body2 font-onest",
                                    isLinkActive(item.href) && "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                                )}
                            >
                                <item.icon className={`${isCollapsed ? "mx-auto" : "mr-2"} h-4 w-4`} />
                                {!isCollapsed && <span className='mt-0.5'>{item.name}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}