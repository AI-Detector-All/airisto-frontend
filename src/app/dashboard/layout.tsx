'use client';
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { RolesEnum } from "@/enums/roles";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    if (!user?.corporate?.isActive) {
      if (user?.role === RolesEnum.INSTITUTION_ADMIN) {
        router.push('/corporate/subscription-required');
        return;
      } else if (user?.role === RolesEnum.STUDENT || user?.role === RolesEnum.ACADEMICIAN) {
        router.push("/corporate/access-denied");
        return;
      }
    }

    if (!user.subscription) {
      router.push('/#pricing');
      return;
    }
  }, [router, user]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <DashboardSidebar 
          isCollapsed={isCollapsed} 
          toggleSidebar={toggleSidebar}
          userRole={user?.role as RolesEnum || RolesEnum.USER}
          isMobileOpen={isMobileMenuOpen}
          closeMobileSidebar={closeMobileMenu}
        />
        
        {/* Main Content Area */}
        <div className={cn(
          "min-h-screen transition-all duration-300",
          // Desktop: sidebar genişliğine göre margin
          isCollapsed ? "lg:ml-16" : "lg:ml-64",
          // Mobile: margin yok çünkü sidebar overlay
          "ml-0"
        )}>
          <DashboardHeader 
            toggleMobileMenu={toggleMobileMenu}
            isMobileMenuOpen={isMobileMenuOpen}
          />
          <main className="p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}