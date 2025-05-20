import { SubscriptionHero } from "../subscription-hero";
import { SubscriptionPlan } from "../subscription-plan";

export default function SubscriptionView() {
    return (
        <div className="bg-gray-100 w-full min-h-screen p-8">
            <SubscriptionHero />
            <SubscriptionPlan />
        </div>
    )
}