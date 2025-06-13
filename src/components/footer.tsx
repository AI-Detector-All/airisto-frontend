'use client'
import { useTranslate } from "@/locales";
import Link from "next/link";

export default function Footer() {
    const { t } = useTranslate('footer');
    return (
        <div className="w-full flex flex-col p-8 mt-32 bg-gray-900">
            <div className="w-full lg:flex block justify-center lg:justify-between lg:px-8 items-center">
                <p className="text-body3 text-white font-semibold font-onest"> {t('footerCopyright')} </p>
                <div className="flex gap-4 mt-4 lg:mt-0">
                    <Link href={'/privacy'}>
                        <p className="text-body3 text-white font-onest underline underline-offset-4"> {t('footerPrivacy')} </p>
                    </Link>
                    <Link href={'/terms-of-service'}>
                        <p className="text-body3 text-white font-onest underline underline-offset-4"> {t('footerTerms')} </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}