import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ChevronLeft, Crown, Zap } from "lucide-react";
import Link from "next/link";

export function SubscriptionHero() {
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

    return (
        <div className="w-full px-8 flex flex-col ">
            <div className="flex justify-between items-center">
                <div>
                    <Link href={'/dashboard'} className="flex gap-2 items-center">
                        <ChevronLeft className="text-gray-600" />
                        <h1 className="text-body2 text-gray-600 font-onest">Ana Sayfa</h1>
                    </Link>
                </div>
            </div>
            <div className="bg-white p-4 rounded-md mt-4 w-full">
                <div>
                    <h1 className="text-gray-900 font-onest text-header4 font-semibold"> Abonelik Özetiniz </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 w-full">
                    <Card className="bg-transparent border-none shadow-none ">
                        <CardContent>
                            <div className="p-8 flex items-center justify-between bg-success-400 rounded-lg">
                                <div>
                                    <h1 className="text-white text-body2 font-onest"> Abonelik Planı </h1>
                                    <h1 className="text-white text-body2 font-onest font-semibold"> {planDetails.planName} </h1>
                                </div>
                                <Crown className="text-white text-2xl" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-transparent border-none shadow-none">
                        <CardContent>
                            <div className="p-8 flex items-center justify-between bg-fuchsia-400 rounded-lg">
                                <div>
                                    <h1 className="text-white text-body2 font-onest"> Yenileme Tarihi </h1>
                                    <h1 className="text-white text-body2 font-onest font-semibold"> {planDetails.renewalDate} </h1>
                                </div>
                                <Calendar className="text-white text-2xl" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-transparent border-none shadow-none">
                        <CardContent>
                            <div className="p-8 flex items-center justify-between bg-warning-400 rounded-lg">
                                <div>
                                    <h1 className="text-white text-body2 font-onest"> Kalan token </h1>
                                    <h1 className="text-white text-body2 font-onest font-semibold"> {planDetails.wordTokens.remaining} / {planDetails.wordTokens.total} </h1>
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