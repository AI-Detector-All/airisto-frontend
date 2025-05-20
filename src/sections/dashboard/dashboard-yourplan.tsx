"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Crown, Zap } from "lucide-react";
import Link from "next/link";

export function DashboardYourPlan() {

    const planDetails = {
        planName: "Kurumsal Aylık Plan",
        renewalDate: "25 Haziran 2025",
        wordTokens: {
            total: 1000,
            used: 185,
            remaining: 815
        },
        imageTokens: {
            total: 100,
            used: 50,
            remaining: 50
        },
    }

    const wordProgressPercentage = (planDetails.wordTokens.used / planDetails.wordTokens.total) * 100;

    return (
        <div className="w-full px-8 flex  mt-10">
            <Card className="w-full shadow-none border-none">
                <CardHeader className="pb-4">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-header4 font-semibold font-onest text-gray-900">Abonelik Planınız</CardTitle>
                        <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
                            {planDetails.planName}
                        </Badge>
                    </div>
                    <CardDescription className="pt-2 text-gray-600">
                        Yenileme tarihi: <span className="font-medium">{planDetails.renewalDate}</span>
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Zap className="h-4 w-4 text-purple-500 mr-2" />
                                <span className="text-sm font-medium">Kelime Token</span>
                            </div>
                            <span className="text-sm text-gray-500">{planDetails.wordTokens.remaining} / {planDetails.wordTokens.total}</span>
                        </div>
                        <Progress
                            value={wordProgressPercentage}
                            className="h-2 bg-purple-100"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>{planDetails.wordTokens.remaining} token kaldı</span>
                            <span>{planDetails.wordTokens.used} token kullanıldı</span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between pt-4">
                    <Link
                        prefetch={false}
                        href={"/dashboard/upgrade"}
                        className="bg-gradient-to-r from-fuchsia-400 to-magenta-400 flex space-x-2 items-center text-sm font-medium text-white hover:text-foreground transition-colors rounded-md px-4 py-2 font-onest"
                    >
                        <span>Plan Detayları</span>
                        <Crown className="h-4 w-4" />

                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}