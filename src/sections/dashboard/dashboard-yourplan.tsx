"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Crown, Zap } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { DashboardSkeleton } from "@/components/ui/global-loader";
import { useSubscription } from "@/hooks/useSubscription";
import { formatDate } from "@/utils/date-formatter";
import { useTranslate } from "@/locales";

export function DashboardYourPlan() {
    const { t } = useTranslate('dashboard');
    const { user, isLoading, getTokenUsage } = useAuth();
    const { subscription } = useSubscription();
    const { used, total, percentage } = getTokenUsage();

    if (isLoading) return <DashboardSkeleton />

    return (
        <div className="w-full px-8 flex  mt-10">
            <Card className="w-full shadow-none border-none">
                <CardHeader className="pb-4">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-header4 font-semibold font-onest text-gray-900">{t('subscriptionPlan')}</CardTitle>
                        <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
                            {subscription?.name}
                        </Badge>
                    </div>
                    <CardDescription className="pt-2 text-gray-600">
                        {t('renewalDate')} <span className="font-medium">{formatDate(user?.renewalDate ?? new Date(), { hour: undefined, minute: undefined })}</span>
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Zap className="h-4 w-4 text-purple-500 mr-2" />
                                <span className="text-sm font-medium">{t('wordToken')}</span>
                            </div>
                            <span className="text-sm text-gray-500">{used} / {total}</span>
                        </div>
                        <Progress
                            value={percentage}
                            className="h-2 bg-purple-100"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>{total - used} {t('tokensRemaining')}</span>
                            <span>{used} {t('tokensUsed')}</span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between pt-4">
                    <Link
                        prefetch={false}
                        href={"/dashboard/upgrade"}
                        className="bg-gradient-to-r from-fuchsia-400 to-magenta-400 flex space-x-2 items-center text-sm font-medium text-white hover:text-foreground transition-colors rounded-md px-4 py-2 font-onest"
                    >
                        <span>{t('planDetails')}</span>
                        <Crown className="h-4 w-4" />
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}