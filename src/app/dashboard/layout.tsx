'use client';
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { RolesEnum } from "@/enums/roles";
import { useSubscription } from "@/hooks/useSubscription";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { subscription, loading, error } = useSubscription();

  const router = useRouter();
  const { user, isLoading: userLoading } = useAuth();

  useEffect(() => {
    if (userLoading) return;

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

    if (loading) return;

    if (subscription === null || error) {
      router.push('/#pricing');
      return;
    }
  }, [router, user, subscription, loading, error, userLoading]);

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
        <DashboardSidebar
          isCollapsed={isCollapsed}
          toggleSidebar={toggleSidebar}
          userRole={user?.role as RolesEnum || RolesEnum.USER}
          isMobileOpen={isMobileMenuOpen}
          closeMobileSidebar={closeMobileMenu}
        />

        <div className={cn(
          "min-h-screen transition-all duration-300",
          isCollapsed ? "lg:ml-16" : "lg:ml-64",
          "ml-0"
        )}>
          <DashboardHeader
            toggleMobileMenu={toggleMobileMenu}
            isMobileMenuOpen={isMobileMenuOpen}
          />
          <main className="">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}