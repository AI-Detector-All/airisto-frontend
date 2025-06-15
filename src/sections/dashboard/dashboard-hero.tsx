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
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
                <div className="flex-1 p-2 lg:p-0">
                    <h1 className="text-body2 text-gray-600 font-onest">{t('homepage')}</h1>
                    <p className="text-gray-900 text-header font-onest font-semibold break-words">
                        {t('welcome')} {user.name} {user.surname}
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:mr-8 w-full sm:w-auto">
                    <Button 
                        variant={'outline'} 
                        className="rounded-md px-4 py-2 border border-gray-300 w-full sm:w-auto"
                    >
                        <Link href={'/dashboard/documents'} className="w-full">
                            <p className="text-body2 text-gray-900 font-onest text-center sm:text-left">
                                {t('documents')}
                            </p>
                        </Link>
                    </Button>
                    <Button className="bg-fuchsia-400 rounded-md px-4 py-2 hover:bg-fuchsia-500 w-full sm:w-auto">
                        <Link href={'/dashboard/ai-detector'} className="flex gap-2 items-center justify-center w-full">
                            <Plus className="text-white h-4 w-4" />
                            <p className="text-body2 text-white font-onest">
                                {t('newDetection')}
                            </p>
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="mt-6 sm:mt-8 bg-gray-200 rounded-xl p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-2">
                    <h2 className="font-bold text-lg sm:text-xl leading-tight">
                        {t('aiDetectorTitle')}
                    </h2>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                        {t('aiDetectorDescription')}
                    </p>
                    <div className="flex gap-2 mt-4">
                        <Button className="bg-violet-600 hover:bg-violet-700 rounded-full flex items-center gap-2 w-full sm:w-auto justify-center">
                            <Link className="flex items-center gap-2 w-full justify-center" href={'/dashboard/ai-detector'}>
                                <PlusIcon className="h-4 w-4 flex-shrink-0" />
                                <span className="text-sm sm:text-base">{t('tryNow')}</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mt-6 sm:mt-8 bg-white p-4 sm:p-6 lg:p-8 rounded-md shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-6 w-6 flex items-center justify-center rounded text-white flex-shrink-0">
                        <Zap className="h-4 w-4 text-fuchsia-400" />
                    </div>
                    <h3 className="font-medium text-sm sm:text-base">
                        {t('searchQuestion')}
                    </h3>
                </div>

                <div className="w-full">
                    <SearchInput 
                        placeholder={t('searchPlaceholder')}
                    />
                </div>
            </div>
        </div>
    )
}