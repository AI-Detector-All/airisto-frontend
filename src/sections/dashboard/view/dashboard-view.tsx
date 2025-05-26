'use client';
import { DashboardSkeleton } from "@/components/ui/global-loader";
import { DashboardRecently } from "../dasboard-recently";
import { DashboardDocuments } from "../dashboard-documents";
import { DashboardHero } from "../dashboard-hero";
import { DashboardYourPlan } from "../dashboard-yourplan";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardView() {
    const { user, isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (!isAuthenticated || !user) {
        return <div>Please login to continue</div>;
    }

    return (
        <div className="bg-gray-100 w-full min-h-screen p-8">
            <DashboardHero user={user} />

            <DashboardRecently />

            <DashboardDocuments />

            <DashboardYourPlan />
        </div>
    )
}