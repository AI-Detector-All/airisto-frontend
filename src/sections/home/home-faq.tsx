import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
    {
        question: "Bu yapay zeka tespiti ne işe yarar?",
        answer:
            "Bu uygulama, girilen metin veya dokümanların ne kadarının yapay zeka tarafından yazıldığını tespit etmeye yardımcı olur."
    },
    {
        question: "Yapay zeka tespiti nasıl yapılır?",
        answer:
            "Gelişmiş makine öğrenimi modelleri ve dil işleme teknikleri kullanılarak metindeki yapay zeka üretimi izleri analiz edilir."
    },
    {
        question: "Hangi dosya türlerini analiz edebilirim?",
        answer:
            "Şu anda .txt, .docx ve .pdf dosyalarını destekliyoruz. Yakında daha fazla format desteği eklenecektir."
    },
    {
        question: "Sonuçlar ne kadar güvenilir?",
        answer:
            "Modelimiz yüksek doğruluk oranına sahiptir ancak %100 kesinlik garanti edilmez. İnsan incelemesiyle birlikte kullanılması önerilir."
    },
    {
        question: "Ücretsiz plan mevcut mu?",
        answer:"Ücretsiz plan şuanda mevcut değildir."
    }
];



export default function HomeFAQ() {
    return (
        <div id="faq" className="mt-16 w-full min-h-screen flex justify-center items-center">
            <div className="w-1/2 flex justify-center items-center mx-auto flex-col font-onest">
                <h1 className="text-3xl font-bold mb-4"> Frequently Asked Questions </h1>
                <p className="text-gray-700 max-w-2xl mx-auto font-onest">
                    Our support team will get assistance from AI-powered suggestions, making it quicker
                    than ever to handle support requests.
                </p>
                <Accordion type="single" collapsible className="mt-6 w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`faq-${index}`} className="border-b border-gray-700 rounded-lg p-4">
                            <AccordionTrigger className="text-gray-800 text-lg">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-gray-800">{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}