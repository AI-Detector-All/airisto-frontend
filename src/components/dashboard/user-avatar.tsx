'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User, User2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { DashboardSkeleton } from "../ui/global-loader";
import { useTranslate } from "@/locales";

interface UserAvatarProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any
}

export function UserAvatar({ user }: UserAvatarProps) {
    const { t } = useTranslate('dashboard-hs');
    const { logout, isLoading } = useAuth();

    if (isLoading) return <DashboardSkeleton />;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2 font-onest">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={user.picture} />
                            <AvatarFallback className="bg-fuchsia-400">
                                <User2 className="h-8 w-8 text-white" />
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal font-onest">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer font-onest">
                    <Link href={'/dashboard/profile'} className="flex items-center gap-1">
                        <User className="mr-2 h-4 w-4" />
                        <span> {t('profile')} </span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer font-onest">
                    <Link href={'/dashboard/subscription'} className="flex items-center gap-1">
                        <User className="mr-2 h-4 w-4" />
                        <span>{t('subsPlan')}</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer font-onest" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('logout')}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}