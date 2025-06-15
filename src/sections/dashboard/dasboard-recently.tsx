import { useTranslate } from "@/locales";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";

export function DashboardRecently() {
    const { t } = useTranslate('dashboard');

    return (
        <div className="w-full px-4 lg:px-8 flex justify-center items-center mt-10">
            <div className="bg-white w-full p-4 rounded-md">
                <div className="flex flex-col">
                    <h1 className="text-header4 font-onest font-semibold">{t('recentlyUsed')}</h1>
                    <Link href={'/dashboard/ai-detector'} className="mt-4 flex justify-between items-center gap-2 bg-success-400 rounded-lg px-4 py-2">
                        <div className="flex gap-2">
                            <Search className="text-white" />
                            <div>
                                <p className="text-body2 font-bold text-white font-onest">{t('aiDetection')}</p>
                                <p className="text-body2 text-white font-onest">41 {t('resultsCount')}</p>
                            </div>
                        </div>
                        <ChevronRight className="text-white" />
                    </Link>
                </div>
            </div>
        </div>
    )
}