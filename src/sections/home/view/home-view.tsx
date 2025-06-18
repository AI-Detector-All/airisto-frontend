import { Separator } from "@/components/ui/separator";
import { HomeContent } from "../home-content";
import { HomeHero } from "../home-hero";
import { HomeHowItWorks } from "../home-howitwork";
import { HomeProvide } from "../home-provide";
import { HomePricing } from "@/sections/home/home-pricing";
import HomeCTA from "../home-cta";
import HomeFAQ from "../home-faq";
import { LanguageDetectionPopup } from "../language-detection";

export default function HomeView() {
    return (
        <div>
            <LanguageDetectionPopup />

            <HomeHero />

            <Separator className="my-8" />

            <HomeContent />

            <Separator className="my-8" />

            <HomeProvide />

            <Separator className="my-8" />

            <HomeHowItWorks />

            <Separator className="my-8" />

            <HomePricing />

            <Separator className="my-8" />
            
            <HomeCTA />

            <Separator className="my-8" />

            <HomeFAQ />
        </div>
    )
}