import { Card } from "@/components/ui/card";

export function HomeHowItWorks() {
    return (
        <div id="how-it-works" className="w-full flex justify-center items-center min-h-screen">
            <div className="w-full lg:w-3/4 bg-slate-900 text-white rounded-3xl p-12 mt-16">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold mb-4 font-onest">Nasıl Çalışıyor?</h2>
                    <p className="text-slate-300 max-w-3xl mx-auto font-onest mt-8">
                        Yapay zeka tarafından oluşturulan içeriği olağanüstü doğrulukla tespit etmek için gelişmiş algoritmaların ve makine öğreniminin gücünden yararlanma konusunda tutkuluyuz. Son teknoloji Yapay Zeka Algılama teknolojimiz, kalıpları analiz etmek, işaretçileri belirlemek ve herhangi bir metnin gerçekliğini doğrulamak için tasarlanmıştır.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                    <StepCard
                        number="1"
                        title="İçeriğinizi Gönderin"
                        description="Sistemimiz düz metin, belgeler, makaleler, denemeler ve daha fazlası dahil olmak üzere çok çeşitli içerik formatlarını kabul eder. Analiz sürecini başlatmak için metninizi yapıştırmanız veya bir belge yüklemeniz yeterlidir. Platformumuz kısa paragraflardan tam akademik makalelere kadar her uzunluktaki içeriği işler."
                    />

                    <StepCard
                        number="2"
                        title="Gelişmiş Analiz"
                        description="Algılama algoritmalarımız dilsel kalıpları, üslup tutarsızlıklarını ve yapay zeka tarafından oluşturulan metni ayırt eden yapısal unsurları inceler. Büyük dil modelleri tarafından oluşturulan içeriği tanımlamak için cümle çeşitliliğini, kelime kullanımını, ton tutarlılığını ve çok sayıda özel işaretleyiciyi analiz ediyoruz."
                    />

                    <StepCard
                        number="3"
                        title="Detaylı Sonuçlar!"
                        description="Belirli göstergelerin yüzde dağılımları ile yapay zeka oluşturma olasılığını gösteren kapsamlı raporlar alın. Sonuçlarımız, metnin neden insan veya makine tarafından yazılmış gibi göründüğüne dair eyleme geçirilebilir bilgiler sağlayarak eğitimcilerin, yayıncıların ve içerik yöneticilerinin bilinçli kararlar almasına yardımcı olur."
                    />
                </div>
            </div>
        </div>
    );
}

interface StepCardProps {
    number: string;
    title: string;
    description: string;
}

function StepCard({ number, title, description }: StepCardProps) {
    return (
        <Card className="bg-slate-800 border-0 p-8 text-center h-full flex flex-col items-center">
            <div className="bg-purple-600 w-12 h-12 rounded-lg mb-6 flex items-center justify-center text-white font-bold text-xl font-onest">
                {number}
            </div>

            <h3 className="text-xl font-bold mb-4 font-onest text-white">{title}</h3>

            <p className="text-slate-300 text-sm font-onest">
                {description}
            </p>
        </Card>
    );
}