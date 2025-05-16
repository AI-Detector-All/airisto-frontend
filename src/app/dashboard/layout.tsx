
import { ThemeProvider } from "@/components/theme-provider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    

    return (
        <ThemeProvider>
            <div className="min-h-screen flex flex-col">
                {/* <Header /> */}
                <main className="flex-1"> {children} </main>
            </div>
        </ThemeProvider>
    );
}
