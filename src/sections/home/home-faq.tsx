'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslate } from "@/locales";

export default function HomeFAQ() {
    const { t } = useTranslate('home')

    const faqs = [
        {
            question: t('faqQ1'),
            answer:
                t('faqA1')
        },
        {
            question: t('faqQ2'),
            answer:
                t('faqA2')
        },
        {
            question: t('faqQ3'),
            answer:
                t('faqA3')
        },
        {
            question: t('faqQ4'),
            answer:
                t('faqA4')
        },
        {
            question: t('faqQ5'),
            answer: t('faqA5')
        }
    ];

    return (
        <div id="faq" className="mt-16 w-full min-h-screen flex justify-center items-center">
            <div className="w-full lg:w-1/2 p-4 lg:p-0 flex justify-center items-center mx-auto flex-col font-onest">
                <h1 className="text-3xl font-bold mb-4"> {t('faqTitle')} </h1>
                <p className="text-gray-700 max-w-2xl mx-auto font-onest">
                    {t('faqDesc')}
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