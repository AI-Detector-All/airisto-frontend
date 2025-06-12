'use client';
import { Button } from "@/components/ui/button";
import { useTranslate } from "@/locales";
import Link from "next/link";

export function HomeHero() {
    const { t } = useTranslate('home');

    return (
        <div id="home" className="w-full flex flex-col justify-center items-center min-h-screen">
            <div className="lg:p-4 bg-gray-200 rounded-xl">
                <h1 className="text-body2 font-onest text-gray-700"> {t('heroTitle')} </h1>
            </div>
            <div className="mt-8 flex flex-col justify-center items-center p-4 lg:p-0">
                <h1 className="text-dlg font-onest font-bold text-gray-900"> {t('heroTitle1')} </h1>
                <p className="text-gray-700 text-body2 font-onest mt-4"> {t('heroDesc')} </p>
            </div>
            <div className="flex justify-center items-center mt-16">
                <Link href={"#how-it-works"}>
                    <Button className="rounded-md px-8 py-6 bg-gradient-to-br from-fuchsia-400 via-magenta-400 to-warning-400 ">
                        <h1 className="text-white font-onest text-body2 "> {t('HowItWorks')} </h1>
                    </Button>
                </Link>
            </div>
        </div>
    )
}