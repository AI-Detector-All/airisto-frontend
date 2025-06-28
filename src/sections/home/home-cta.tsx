'use client'
import { Button } from "@/components/ui/button"
import { useTranslate } from "@/locales"
import { Send } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomeCTA() {
    const { t } = useTranslate('home');
    return (
        <section className="flex items-center justify-center font-onest p-4 lg:p-0">
            <div className="lg:w-3/4 lg:py-36  lg:mb-8 flex justify-center items-center bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-3xl p-8 text-white">
                <div className="text-center space-y-8 max-w-3xl">
                    <div className="flex items-center justify-center">
                        <Image
                            src="/airisto-white.png"
                            alt="Airisto logo"
                            width={180}
                            height={38}
                            priority
                        />
                    </div>
                    <div className="text-5xl font-bold font-onest mt-8">
                        {t('ctaTitle')}
                    </div>
                    <p className="text-body2 mt-8 font-onest">
                        {t('ctaTitle2')}
                    </p>
                    <Link href={'/sign-in'} >
                        <Button className="bg-gray-800 hover:bg-gray-800 text-white px-8 py-6 rounded-md text-body font-onest mt-8 hover:scale-105 transition-all ease-in-out duration-300">
                            {t('ctaStartNow')}
                            <Send className="" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
