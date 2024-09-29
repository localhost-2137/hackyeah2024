import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {MdSend} from "react-icons/md";
import {Separator} from "@/components/ui/separator";
import TextMessage from "@/app/(protected)/chat/[chatId]/textMessage";
import MoneyRequestMessage from "@/app/(protected)/chat/[chatId]/moneyRequestMessage";
import RequirementsMessage from "@/app/(protected)/chat/[chatId]/requirementsMessage";

export interface Message {
    id: number,
    content: string,
    isYourMessage: boolean,
    updatedAt?: string,
    type: "text" | "requirements" | "moneyRequest",
    status?: "accepted" | "rejected" | "pending",
    requirements?: Array<{
        id: number,
        name: string,
        description: string
    }>,
    money?: number
}

interface IChatData {
    messages: Message[],
    recipient: string
}

export default function ChatPage() {

    // const chatData = await getChatData

    const chatData: IChatData = {
        messages: [
            {
                id: 1,
                content: "Witaj, jesteśmy chętni podjąć współpracę.",
                isYourMessage: true,
                type: "text"
            }, {
                id: 2,
                content: "Cześć, to są nasze wymagania biznesowe.",
                requirements: [
                    {
                        id: 1,
                        name: "Wymaganie 1",
                        description: "Opis wymagania 1"
                    },
                    {
                        id: 2,
                        name: "Wymaganie 2",
                        description: "Opis wymagania 2"
                    },
                    {
                        id: 3,
                        name: "Wymaganie 3",
                        description: "Opis wymagania 3"
                    }
                ],
                isYourMessage: false,
                type: "requirements"
            }, {
                id: 3,
                content: "Akceptujemy warunki, jednakże potrzebujemy dotacji.",
                type: "moneyRequest",
                isYourMessage: true,
                money: 10000
            }
        ],
        recipient: "Blachotrapez"
    }

    return (
        <main className="py-10 px-5 max-w-[1400px] mx-auto flex flex-col gap-4">
            <Card className="px-10 py-5 min-h-[600px]">
                <CardHeader>
                    <CardTitle className="text-2xl">Czat z {chatData.recipient}</CardTitle>
                </CardHeader>
                <Separator/>
                <CardContent className="flex flex-col gap-4 py-4 overflow-scroll">
                    {
                        chatData.messages.map((message) => {

                            if (message.type === "text") {
                                return <TextMessage key={message.id} message={message}/>
                            }

                            if (message.type === "requirements") {
                                return <RequirementsMessage key={message.id} message={message}/>
                            }

                            if (message.type === "moneyRequest") {
                                return <MoneyRequestMessage key={message.id} message={message}/>
                            }

                        })
                    }
                </CardContent>
            </Card>
            <Card className="flex flex-row gap-4 p-4">
                <Input placeholder="Wpisz wiadomość..."/>
                <Button className="bg-red-700 hover:bg-red-500"><MdSend/></Button>
            </Card>
        </main>
    )
}
