'use client'
import Link from "next/link";
// import DarkModeToggle from "../dark-mode-toggle";
import { Notification } from "./notification";
import { UserAvatar } from "./user-avatar";
import { Progress } from "../ui/progress";
import { Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { InlineLoader } from "../ui/global-loader";

export default function DashboardHeader() {
    const { user, isLoading, isAuthenticated, getTokenUsage } = useAuth();
    const { used, total, percentage } = getTokenUsage();

    if (isLoading) {
        return <InlineLoader size="sm" />;
    }

    if (!isAuthenticated || !user) {
        return <div>Please login to continue</div>;
    }


    const logout = () => { }
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
                                        <span className="text-sm font-medium">Kullanılan Token</span>
                                    </div>
                                    <span className="text-sm text-gray-500">{used} / {total}</span>
                                </div>
                                <Progress
                                    value={percentage}
                                    className="h-2 bg-purple-100"
                                />
                            </div>
                        </nav>

                        {/* <DarkModeToggle /> */}

                        {user ? (
                            <>
                                <Notification />
                                <UserAvatar user={user} logout={logout} />
                            </>
                        ) : (
                            <Link
                                href="/"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-4 py-2"
                            >
                                Sign In
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