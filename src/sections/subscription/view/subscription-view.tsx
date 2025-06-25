'use client'
import { useSubscription } from "@/hooks/useSubscription";
import { SubscriptionHero } from "../subscription-hero";
import { SubscriptionPlan } from "../subscription-plan";
import { useAuth } from "@/hooks/useAuth";
import { DashboardSkeleton } from "@/components/ui/global-loader";

export default function SubscriptionView() {
    const { user, isLoading, isAuthenticated } = useAuth();
    const { subscription } = useSubscription();

    if (isLoading || !subscription) return <DashboardSkeleton />

    if (!isAuthenticated || !user) return <div>Please login to continue</div>

    const getTokenUsage = {
        used: subscription.usedAnalyses,
        total: subscription.maxAnalyses,
        percentage: subscription?.maxAnalyses > 0 ? (subscription?.usedAnalyses / subscription?.maxAnalyses) * 100 : 0
    }

    return (
        <div className="bg-gray-100 w-full min-h-screen p-8">
            <SubscriptionHero getTokenUsage={getTokenUsage} user={user} subscription={subscription} />
            <SubscriptionPlan activePlansType={user.type} />
        </div>
    )
}