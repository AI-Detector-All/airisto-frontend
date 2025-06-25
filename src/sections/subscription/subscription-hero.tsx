import { Card, CardContent } from "@/components/ui/card";
import { useTranslate } from "@/locales";
import { User } from "@/types/user";
import { UserSubscription } from "@/types/user-subscription";
import { formatDate } from "@/utils/date-formatter";
import { Calendar, ChevronLeft, Crown, Zap } from "lucide-react";
import Link from "next/link";

interface SubscriptionHeroProps {
    user: User
    subscription: UserSubscription
    getTokenUsage: { used: number; total: number; percentage: number; }
}

export function SubscriptionHero({ user, subscription, getTokenUsage }: SubscriptionHeroProps) {
    const { used, total } = getTokenUsage;
    const { t } = useTranslate('subscription');

    return (
        <div className="w-full lg:px-8 flex flex-col ">
            <div className="flex justify-between items-center">
                <div>
                    <Link href={'/dashboard'} className="flex gap-2 items-center">
                        <ChevronLeft className="text-gray-600" />
                        <h1 className="text-body2 text-gray-600 font-onest"> {t('home')} </h1>
                    </Link>
                </div>
            </div>
            <div className="bg-white p-4 rounded-md mt-4 w-full">
                <div>
                    <h1 className="text-gray-900 font-onest text-header4 font-semibold"> {t('summary')} </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 w-full">
                    <Card className="bg-transparent border-none shadow-none ">
                        <CardContent>
                            <div className="p-8 flex items-center justify-between bg-success-400 rounded-lg">
                                <div>
                                    <h1 className="text-white text-body2 font-onest"> {t('subscriptionPlan')} </h1>
                                    <h1 className="text-white text-body2 font-onest font-semibold"> {subscription.subscription.name} </h1>
                                </div>
                                <Crown className="text-white text-2xl" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-transparent border-none shadow-none">
                        <CardContent>
                            <div className="p-8 flex items-center justify-between bg-fuchsia-400 rounded-lg">
                                <div>
                                    <h1 className="text-white text-body2 font-onest"> {t('renewalDate')} </h1>
                                    <h1 className="text-white text-body2 font-onest font-semibold"> {formatDate(user?.renewalDate ?? new Date(), { hour: undefined, minute: undefined })} </h1>
                                </div>
                                <Calendar className="text-white text-2xl" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-transparent border-none shadow-none">
                        <CardContent>
                            <div className="p-8 flex items-center justify-between bg-warning-400 rounded-lg">
                                <div>
                                    <h1 className="text-white text-body2 font-onest"> {t('tokensRemaining')} </h1>
                                    <h1 className="text-white text-body2 font-onest font-semibold"> {total - used} / {total} </h1>
                                </div>
                                <Zap className="text-white text-2xl" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}