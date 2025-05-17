"use client";

import { useState } from 'react';
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
    LifeBuoy
} from "lucide-react";
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

const sidebarItems = [
    {
        name: "Ana Sayfa",
        icon: LayoutDashboard,
        href: "/dashboard",
    },
    {
        name: "Dokümanlar",
        icon: FileText,
        href: "/dashboard/documents",
    },
    {
        name: "Yapay Zeka Dedektörü",
        icon: Search,
        href: "/dashboard/ai-detector",
    },

]

const bottomItems = [
    {
        name: "Support",
        icon: LifeBuoy,
        href: "/dashboard/support",
    },
    {
        name: "Settings",
        icon: Settings,
        href: "/dashboard/settings",
    }
]

export default function DashboardSidebar({ className, ...props }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();
    
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const isLinkActive = (href: string) => {
        if (href === '/dashboard') {
            return pathname === '/dashboard';
        }
        return pathname.startsWith(href);
    };

    return (
        <div
            className={cn(
                "flex flex-col h-screen bg-slate-50 border-r border-slate-200 transition-all duration-300",
                isCollapsed ? "w-16" : "w-64",
                className
            )}
            {...props}
        >
            <div className="flex items-center justify-between p-6 ">
                {!isCollapsed && (
                    <div className="flex items-center gap-4">
                        <Image
                            src="/favicon.ico"
                            alt="Next.js logo"
                            width={30}
                            height={15}
                            priority
                        />
                        <h1 className="text-body font-bold font-onest tracking-wider ">Airisto</h1>
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
                    {sidebarItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center rounded-md p-2 text-gray-600 hover:bg-fuchsia-50 hover:text-gray-600",
                                    "transition-all duration-200  text-body2 font-onest",
                                    isLinkActive(item.href) && "bg-fuchsia-50 text-fuchsia-400 hover:bg-fuchsia-100 hover:text-fuchsia-500"
                                )}
                            >
                                <item.icon className={`mr-2 h-4 w-4  ${isLinkActive(item.href) && "text-fuchsia-400"}`} />
                                {!isCollapsed && <span className='mt-0.5'>{item.name}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="border-t border-slate-200 py-4">
                <ul className="space-y-1 px-2">
                    {bottomItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center rounded-md p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                                    "transition-all duration-200 text-body2 font-onest",
                                    isLinkActive(item.href) && "bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                                )}
                            >
                                <item.icon className="mr-2 h-4 w-4" />
                                {!isCollapsed && <span className='mt-0.5'>{item.name}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}