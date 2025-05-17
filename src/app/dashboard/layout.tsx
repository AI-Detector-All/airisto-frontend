
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/sidebar";
import { ThemeProvider } from "@/components/theme-provider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {


    return (
        <ThemeProvider>
            <div className="min-h-screen flex w-full">
                <div className="w-64 hidden lg:flex">
                    <DashboardSidebar />
                </div>
                <div className="w-full">
                    <DashboardHeader />
                    <main className="flex-1"> {children} </main>
                </div>
            </div>
        </ThemeProvider>
    );
}
