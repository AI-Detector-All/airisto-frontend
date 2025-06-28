import { Separator } from "@/components/ui/separator";
import { HomeContent } from "../home-content";
import { HomeHero } from "../home-hero";
import { HomePricing } from "@/sections/home/home-pricing";
import HomeCTA from "../home-cta";
import HomeFAQ from "../home-faq";
import { LanguageDetectionPopup } from "../language-detection";
import { HomeTechnology } from "../home-technology";
import { HomeHowItWorks } from "../home-howitwork";

export default function HomeView() {
    return (
        <div>
            <LanguageDetectionPopup />

            <HomeHero />

            <Separator className="my-4" />

            <HomeContent />

            <Separator className="my-4" />

            <HomeTechnology />

            <HomeHowItWorks />

            <Separator className="my-2" />

            <HomePricing />

            <Separator className="my-4" />
            
            <HomeCTA />

            <Separator className="" />

            <HomeFAQ />
        </div>
    )
}