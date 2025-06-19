'use client';
import { Button } from "@/components/ui/button";
import { useTranslate } from "@/locales";
import Link from "next/link";

export function HomeHero() {
    const { t } = useTranslate('home');

    return (
        <div id="home" className="w-full flex flex-col justify-center items-center mt-16 lg:mt-28 lg:mb-32">
            <div className="lg:p-4 bg-gradient-to-r from-purple-100 to-orange-100 rounded-lg">
                <h1 className="text-body2 font-onest text-purple-700 font-semibold p-2 lg:p-0"> 
                    {t('heroTitle')}
                </h1>
            </div>
            <div className="mt-8 flex flex-col justify-center items-center p-4 lg:p-0 max-w-4xl">
                <h1 className="text-dlg font-onest font-bold text-gray-900 text-center"> 
                    {t('heroTitle1')}
                </h1>
                <p className="text-gray-700 text-body2 font-onest mt-4 text-center max-w-3xl"> 
                    {t('heroDesc')}
                </p>
            </div>
            <div className="flex justify-center items-center mt-16">
                <Link href={"#how-it-works"}>
                    <Button className="rounded-md px-8 py-6 bg-gradient-to-br from-purple-500 via-fuchsia-500 to-orange-500 hover:from-purple-600 hover:via-fuchsia-600 hover:to-orange-600 transition-all duration-300">
                        <h1 className="text-white font-onest text-body2 font-semibold"> 
                            {t('heroHowItWorks')}
                        </h1>
                    </Button>
                </Link>
            </div>
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 font-onest p-2 lg:p-0">
                    {t('regressionProFeatures.models')}
                </p>
            </div>
        </div>
    )
}