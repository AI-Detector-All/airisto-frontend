'use client';
import { useEffect, useState } from "react";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { RolesEnum } from "@/enums/roles";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter()
  const { user } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/sign-in');
    }
  }, [router]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex w-full">
        <div className={`${isCollapsed ? "w-16" : "w-64"} hidden lg:block transition-all duration-300`}>
          <DashboardSidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} userRole={user?.role as RolesEnum  || RolesEnum.USER} />
        </div>
        <div className="flex-1">
          <DashboardHeader />
          <main className="flex-1 lg:ml-16 xl:ml-0 transition-all duration-300">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}