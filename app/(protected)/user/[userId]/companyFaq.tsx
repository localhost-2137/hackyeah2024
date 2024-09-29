"use client"

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {IFaq} from "@/app/(protected)/user/[userId]/page";
import {Suspense} from "react";
import animationData from '@/public/ai-generating.json';
import {LottieAnimation} from "@/components/lottie-animation";
import {FaqAnswer} from "@/components/application/faq-answer";

export default function CompanyFaq({faqQuestions}: Readonly<{ faqQuestions: IFaq[] }>) {
    return (
        <div className="flex flex-col gap-4">
            <span>
                <h3 className="text-2xl font-semibold">FAQ</h3>
                <p className="text-sm font-light">Pytania oraz odpowiedzi są generowane przy użyciu AI</p>
            </span>
            <Accordion type="single">
                {faqQuestions.length === 0 ?
                    <div>Obecnie pytania są w trakcie aktualizacji.</div>
                    :
                    faqQuestions.map((faqQuestion, index) => {
                        return (
                            <AccordionItem key={"aitem-"+index} value={`item-${index}`}>
                                <AccordionTrigger>{faqQuestion.question}</AccordionTrigger>
                                <AccordionContent>
                                        <Suspense fallback={(
                                            <div className="flex items-center space-x-2">
                                                <LottieAnimation animationData={animationData} loop={true}
                                                                 autoplay={true} size={2}/>
                                                <p>AI generating...</p>
                                            </div>
                                        )}>
                                            <FaqAnswer questionId={faqQuestion.id} />
                                        </Suspense>
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })}
            </Accordion>
        </div>
    )
}
