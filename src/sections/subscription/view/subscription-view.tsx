'use client'
import { useSubscription } from "@/hooks/useSubscription";
import { SubscriptionHero } from "../subscription-hero";
import { SubscriptionPlan } from "../subscription-plan";
import { useAuth } from "@/hooks/useAuth";
import { DashboardSkeleton } from "@/components/ui/global-loader";

export default function SubscriptionView() {
    const { user, isLoading, isAuthenticated, getTokenUsage } = useAuth();
    const { subscription } = useSubscription();

    if (isLoading || !subscription) return <DashboardSkeleton />

    if (!isAuthenticated || !user) return <div>Please login to continue</div>


    return (
        <div className="bg-gray-100 w-full min-h-screen p-8">
            <SubscriptionHero getTokenUsage={getTokenUsage} user={user} subscription={subscription} />
            <SubscriptionPlan />
        </div>
    )
}