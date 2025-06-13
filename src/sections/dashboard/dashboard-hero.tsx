import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { useTranslate } from "@/locales";
import { User } from "@/types/user";
import { Plus, PlusIcon, Zap } from "lucide-react";
import Link from "next/link";

interface HeroProps {
    user: User
}

export function DashboardHero({ user }: HeroProps) {
    const { t } = useTranslate('dashboard');

    return (
        <div className="w-full px-8 flex flex-col ">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-body2 text-gray-600 font-onest">{t('homepage')}</h1>
                    <p className="text-gray-900 text-header font-onest font-semibold">{t('welcome')} {user.name} {user.surname} </p>
                </div>
                <div className="mr-8 gap-4 flex">
                    <Button variant={'outline'} className="rounded-md px-4 py-2 border border-gray-300">
                        <Link href={'/dashboard/documents'}>
                            <p className="text-body2 text-gray-900 font-onest">{t('documents')}</p>
                        </Link>
                    </Button>
                    <Button className="bg-fuchsia-400 rounded-md px-4 py-2 hover:bg-fuchsia-500">
                        <Link href={'/dashboard/ai-detector'} className="flex gap-2 items-center">
                            <Plus className="text-white" />
                            <p className="text-body2 text-white font-onest">{t('newDetection')}</p>
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Feature Announcement Card */}
            <div className="mt-8 bg-gray-200 rounded-xl p-6 flex justify-between">
                <div className="space-y-2">
                    <h2 className="font-bold text-xl">{t('aiDetectorTitle')}</h2>
                    <p className="text-slate-700">
                        {t('aiDetectorDescription')}
                    </p>
                    <div className="flex gap-2 mt-4">
                        <Button className="bg-violet-600 hover:bg-violet-700 rounded-full flex items-center gap-2">
                            <Link className="flex items-center gap-2" href={'/dashboard/ai-detector'}>
                                <PlusIcon className="h-4 w-4" />
                                {t('tryNow')}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* AI Assistant Section */}
            <div className="mt-8 bg-white p-8 rounded-md">
                <div className="flex items-center gap-2 mb-4">
                    <div className=" h-6 w-6 flex items-center justify-center rounded text-white">
                        <Zap className="h-4 w-4 text-fuchsia-400" />
                    </div>
                    <h3 className="font-medium">{t('searchQuestion')}</h3>
                </div>

                <div className="w-full flex items-center">
                    <SearchInput placeholder={t('searchPlaceholder')} />
                </div>
            </div>
        </div>
    )
}