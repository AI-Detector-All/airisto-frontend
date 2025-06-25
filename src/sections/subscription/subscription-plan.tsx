import { HomePricing } from "../home/home-pricing";

interface SubscriptionPlanProps {
    activePlansType?: string
}

export function SubscriptionPlan({ activePlansType }: SubscriptionPlanProps) {
    console.log(activePlansType);
    
    return (
        <div className="bg-white  rounded-md">
            <HomePricing activePlansType={activePlansType} />
        </div>
    )
}