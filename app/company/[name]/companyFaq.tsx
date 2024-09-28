import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {IFaq} from "@/app/company/[name]/page";

interface ICompanyFaq {
    companyName: string
    faqs: IFaq[]
}

async function waitFiveSeconds(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 5000));
}

export default async function CompanyFaq(props: ICompanyFaq) {

    // const faq = await getCompanyFaq(companyName)
    const {faqs} = props
    await waitFiveSeconds()

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-2xl">FAQ</h3>
            <Accordion type="single">
                {faqs.map((faq, index) => {
                    return (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </div>
    )
}
