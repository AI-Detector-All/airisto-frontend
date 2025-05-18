// app/page.tsx (veya src/app/page.tsx)
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomeCTA() {
    return (
        <section className="flex items-center justify-center min-h-screen p-4 lg:p-0">
            <div className="lg:w-3/4 lg:py-36 flex justify-center items-center bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-3xl p-8 text-white">
                <div className="text-center space-y-6 max-w-3xl">
                    <div className="flex items-center justify-center">
                        <Image
                            src="/favicon.ico"
                            alt="Next.js logo"
                            width={50}
                            height={38}
                            priority
                        />
                    </div>
                    <div className="text-5xl font-bold font-onest mt-8">
                        Yapay Zekayı Tespit Etmeye Hazır mısın?
                    </div>
                    <p className="text-body2 mt-8 font-onest">
                        Yapay zeka üretimi metinleri % doğrulukla tespit edin. Analiz, gerekçeler ve güvenilir sonuçlar tek adımda.
                    </p>
                    <Link href={'/sign-in'} >
                        <Button className="bg-gray-800 hover:bg-gray-800 text-white px-8 py-6 rounded-md text-body font-onest mt-8 hover:scale-105 transition-all ease-in-out duration-300">
                            Hemen Basla
                            <Send className="" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
