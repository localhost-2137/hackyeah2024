import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {MdBusiness, MdMail} from "react-icons/md";
import {Separator} from "@/components/ui/separator";
import AiSuspense from "@/components/aiSuspense";
import CompanyFaq from "@/app/(protected)/user/[userId]/companyFaq";
import {getPublicUserData} from "@/actions/user-data";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FaUser} from "react-icons/fa";
import {Badge} from "@/components/ui/badge";

export interface IFaq {
    question: string,
    answer?: string,
}

interface IUser {
    id: string,
    email: string | null,
    name: string | null,
    description: string | null,
    type: "FREELANCER" | "BUSINESS" | "NGO" | null,
    image: string | null,
    tags: string[],
    updatedAt: Date,
    createdAt: Date,
}

export default async function CompanyPage({params}: { params: { userId: string } }) {

    const userId = params.userId
    const {data}: { data?: IUser } = await getPublicUserData(userId)

    console.log(data)

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

    if (!data) {
        return <div>Brak danych</div>
    }

    return (
        <main className="w-[80%] max-w-[1400px] mx-auto p-10">
            <Card className="p-5">
                <CardHeader className="flex flex-row gap-6 items-center">
                    <Avatar>
                        <AvatarImage src={data?.image || ""}/>
                        <AvatarFallback className="bg-sky-500">
                            <FaUser className="text-white"/>
                        </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-4xl">{data.name}</CardTitle>
                </CardHeader>
                <Separator/>
                <CardContent className="py-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex gap-4 items-center">
                            <div className="bg-red-700 text-white p-2 rounded-xl"><MdMail/></div>
                            <p>Email: {data.email}</p>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="bg-red-700 text-white p-2 rounded-xl"><MdBusiness/></div>
                            <p>Typ organizacji: {data.type ? data.type.toLowerCase() : "Brak określonego typu"}</p>
                        </div>
                    </div>
                </CardContent>
                {data.tags.length ? <>
                    <Separator/>
                    <CardContent className="py-6">
                        <h3 className="text-2xl font-semibold py-2">Tagi</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {data.tags.map((tag, index) => (
                                <Badge key={index}
                                       className="bg-red-700 text-white hover:bg-red-700 p-2 rounded-xl">{tag}</Badge>
                            ))}
                        </div>
                    </CardContent>
                </> : null}
                <Separator/>
                <CardContent className="py-6">
                    <h3 className="text-2xl font-semibold py-2">O Firmie</h3>
                    <p>{data.description ? data.description : "Brak opisu"}</p>
                </CardContent>
                <Separator/>
                <CardContent className="py-6">
                    <AiSuspense>
                        <CompanyFaq companyName={data.name as string} faqs={faqs}/>
                    </AiSuspense>
                </CardContent>
            </Card>
        </main>
    )
}
