'use client'
import Link from "next/link";
// import DarkModeToggle from "../dark-mode-toggle";
import { Crown } from "lucide-react";
import { SearchInput } from "../search-input";
import { Notification } from "./notification";
import { UserAvatar } from "./user-avatar";

export default function DashboardHeader() {
    const user = {
        name: "John Doe",
        email: "vYKu2@example.com",
    }

    const logout = () => { }
    return (
        <header className="backdrop-blur-sm border-b border-border">
            <div className="container mx-auto ">
                <div className="flex h-16 items-center justify-between">

                    <SearchInput />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <nav>
                            <Link
                                prefetch={false}
                                href={"/dashboard/upgrade"}
                                className="bg-gradient-to-r from-fuchsia-400 to-magenta-400 flex space-x-2 items-center text-sm font-medium text-white hover:text-foreground transition-colors rounded-md px-4 py-2 font-onest"
                            >
                                <span>Plan Yükselt</span>
                                <Crown className="h-4 w-4" />

                            </Link>
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