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
    const { user, isLoading } = useAuth();
    const { subscription } = useSubscription();
    // const { used, total, percentage } = getTokenUsage();

    if (isLoading) return <DashboardSkeleton />

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 flex mt-6 sm:mt-8 lg:mt-10">
            <Card className="w-full shadow-none border-none">
                <CardHeader className="pb-4 sm:pb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                        <CardTitle className="text-lg sm:text-xl lg:text-header4 font-semibold font-onest text-gray-900">
                            {t('subscriptionPlan')}
                        </CardTitle>
                        <Badge 
                            variant="outline" 
                            className="bg-purple-100 text-purple-700 border-purple-200 w-fit text-xs sm:text-sm"
                        >
                            {subscription?.subscription.name}
                        </Badge>
                    </div>
                    <CardDescription className="pt-2 text-gray-600 text-sm sm:text-base">
                        {t('renewalDate')} 
                        <span className="font-medium block sm:inline mt-1 sm:mt-0 sm:ml-1">
                            {formatDate(subscription?.validUntil ?? new Date(), { hour: undefined, minute: undefined })}
                        </span>
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 sm:space-y-6">
                    <div className="space-y-3 sm:space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                            <div className="flex items-center">
                                <Zap className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" />
                                <span className="text-sm font-medium">{t('wordToken')}</span>
                            </div>
                            <span className="text-sm text-gray-500 sm:ml-auto">
                                {subscription?.usedAnalyses} / {subscription?.maxAnalyses}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <Progress
                                value={subscription && subscription?.maxAnalyses > 0 ? (subscription?.usedAnalyses / subscription?.maxAnalyses) * 100 : 0}
                                className="h-2 sm:h-2.5 bg-purple-100"
                            />
                            
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-xs text-gray-500">
                                <span>
                                    {subscription && (subscription?.maxAnalyses - subscription?.usedAnalyses).toLocaleString()} {t('tokensRemaining')}
                                </span>
                                <span>
                                    {subscription?.usedAnalyses} {t('tokensUsed')}
                                </span>
                            </div>
                        </div>

                        <div className="sm:hidden bg-gray-50 rounded-lg p-3 mt-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">
                                    {Math.round(subscription && subscription?.maxAnalyses > 0 ? (subscription?.usedAnalyses / subscription?.maxAnalyses) * 100 : 0)}%
                                </div>
                                <div className="text-xs text-gray-600 mt-1">
                                    {t('used') || 'Kullanıldı'}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-center sm:justify-between pt-4 sm:pt-6">
                    <Link
                        prefetch={false}
                        href={"/dashboard/upgrade"}
                        className="bg-gradient-to-r from-fuchsia-400 to-magenta-400 flex space-x-2 items-center justify-center text-sm font-medium text-white hover:text-foreground transition-colors rounded-md px-4 sm:px-6 py-2.5 sm:py-2 font-onest w-full sm:w-auto min-h-[44px] sm:min-h-0"
                    >
                        <span>{t('planDetails')}</span>
                        <Crown className="h-4 w-4 flex-shrink-0" />
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}