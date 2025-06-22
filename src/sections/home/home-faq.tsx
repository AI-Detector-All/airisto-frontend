'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslate } from "@/locales";
import Link from "next/link";

export default function HomeFAQ() {
    const { t } = useTranslate('home')

    const faqs = [
        {
            question: t('faq.faqQ1'),
            answer:
                t('faq.faqA1')
        },
        {
            question: t('faq.faqQ2'),
            answer:
                t('faq.faqA2')
        },
        {
            question: t('faq.faqQ3'),
            answer:
                t('faq.faqA3')
        },
        {
            question: t('faq.faqQ4'),
            answer:
                t('faq.faqA4')
        },
        {
            question: t('faq.faqQ5'),
            answer: t('faq.faqA5')
        }
    ];

    return (
        <div id="faq" className="mt-16 w-full  flex justify-center items-center">
            <div className="w-full lg:w-2/3 p-4 lg:p-8 lg:flex justify-center lg:gap-16 font-onest rounded-xl shadow">
                <div>
                    <h1 className="text-header3 font-semibold text-gray-700 mb-4"> {t('faq.faqTitle')} </h1>
                    <p className="text-gray-700 max-w-2xl mx-auto font-onest">
                        {t('faq.faqDesc')}
                    </p>
                    <p className="text-gray-700 max-w-2xl mx-auto font-onest text-body1 mt-4 font-semibold"> {t('faq.cantFindAnswerTitle')} </p>
                    <Link href={'/sign-in'} className="inline-flex items-center space-x-2 text-gray-500 group cursor-pointer hover:text-blue-600 transition-colors duration-300">
                        <span className="text-sm font-medium">
                            {t('faq.contactUs')}
                        </span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:text-blue-600 transition-all duration-300"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
                <div className="w-full">
                    <Accordion type="single" collapsible className=" w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`faq-${index}`} className="border-b border-gray-700 rounded-lg p-4">
                                <AccordionTrigger className="text-gray-800 text-lg">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-gray-800">{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}