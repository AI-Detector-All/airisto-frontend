'use client';
import { DashboardSkeleton } from "@/components/ui/global-loader";
import { RolesEnum } from "@/enums/roles";
import { useAuth } from "@/hooks/useAuth";
import UsersView from "@/sections/users/view/users-view";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && user?.role !== RolesEnum.INSTITUTION_ADMIN) {
            router.push("/error");
        }
    }, [user, isLoading, router]);

    if (isLoading) return <DashboardSkeleton />;

    if (user?.role !== RolesEnum.ADMIN) return null;

    return <UsersView />
}