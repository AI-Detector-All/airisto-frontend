'use client'
import Link from "next/link";
// import DarkModeToggle from "../dark-mode-toggle";
import { SearchInput } from "../search-input";
import { Notification } from "./notification";
import { UserAvatar } from "./user-avatar";
import { Progress } from "../ui/progress";
import { Zap } from "lucide-react";

export default function DashboardHeader() {
    const user = {
        name: "John Doe",
        email: "vYKu2@example.com",
    }

    const planDetails = {
        planName: "Kurumsal Aylık Plan",
        renewalDate: "25 Haziran 2025",
        wordTokens: {
            total: 1000,
            used: 185,
            remaining: 815
        },
        imageTokens: {
            total: 100,
            used: 50,
            remaining: 50
        },
    }
    const wordProgressPercentage = (planDetails.wordTokens.used / planDetails.wordTokens.total) * 100;

    const logout = () => { }
    return (
        <header className="backdrop-blur-sm border-b border-border">
            <div className="container mx-auto ">
                <div className="flex h-16 items-center justify-between">

                    <SearchInput width="max-w-[800px]" />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <nav>
                            <div className="space-x-4 space-y-2">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center">
                                        <Zap className="h-4 w-4 text-purple-500 mr-2 " />
                                        <span className="text-sm font-medium">Kelime Token</span>
                                    </div>
                                    <span className="text-sm text-gray-500">{planDetails.wordTokens.remaining} / {planDetails.wordTokens.total}</span>
                                </div>
                                <Progress
                                    value={wordProgressPercentage}
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