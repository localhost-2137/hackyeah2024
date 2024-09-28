import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {MdBusiness, MdPeople, MdPushPin, MdSearch} from "react-icons/md";
import {Separator} from "@/components/ui/separator";
import AiSuspense from "@/components/aiSuspense";
import CompanyFaq from "@/app/company/[name]/companyFaq";
import {getPublicUserData} from "@/actions/user-data";

interface ICompany {
    name: string,
    desc: string,
    type: "corporation" | "voluntary organization" | "small/medium businesses",
    location: string,
    industry: string,
    employee: number,
}

export interface IFaq {
    question: string,
    answer?: string,
}

export default async function CompanyPage({params}: { params: { name: string } }) {
    console.log(await getPublicUserData("cm1ml26a50000fik9xwd3w4cx"))

    const companyName = params.name

    const company: ICompany = {
        name: "Google",
        desc: "Google is a global technology leader focused on improving the ways people connect with information. " +
            "With a mission to organize the world's information and make it universally accessible and useful, " +
            "Google offers a wide range of products and services, including search, advertising, cloud computing, " +
            "software, and hardware.",
        type: "corporation",
        location: "UK, london",
        employee: 1500,
        industry: "Information Technology",
    }

    const faqs: IFaq[] = [
        {
            question: "Is it accessible?",
            answer: "Yes. It adheres to the WAI-ARIA design pattern."
        },
        {
            question: "Is it secure?",
            answer: "Yes. It uses the latest security protocols."
        },
        {
            question: "Is it reliable?",
            answer: "Yes. It has a 99.9% uptime guarantee."
        },
    ]

    // const company = await getCompanyByName(companyName)

    return (
        <main className="w-[80%] max-w-[1400px] mx-auto p-10">
            <Card className="p-5">
                <CardHeader>
                    <CardTitle className="text-4xl">{company.name}</CardTitle>
                </CardHeader>
                <Separator/>
                <CardContent className="py-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex gap-4 items-center">
                            <div className="bg-blue-200 p-2 rounded-xl"><MdPushPin/></div>
                            <p>Lokalizacja: {company.location}</p>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="bg-blue-200 p-2 rounded-xl"><MdBusiness/></div>
                            <p>Typ organizacji: {company.type}</p>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="bg-blue-200 p-2 rounded-xl"><MdPeople/></div>
                            <p>Ilość pracowników: {company.employee}+</p>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="bg-blue-200 p-2 rounded-xl"><MdSearch/></div>
                            <p>Przemysł: {company.industry}</p>
                        </div>
                    </div>
                </CardContent>
                <Separator/>
                <CardContent className="py-6">
                    <h3 className="text-2xl font-semibold py-2">O Firmie</h3>
                    <p>{company.desc}</p>
                </CardContent>
                <Separator/>
                <CardContent className="py-6">
                    <AiSuspense>
                        <CompanyFaq companyName={company.name} faqs={faqs}/>
                    </AiSuspense>
                </CardContent>
            </Card>
        </main>
    )
}
