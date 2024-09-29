import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";

export default function ConversationsPage() {

    const conversations = [
        {
            id: 1,
            recipient: "Blachotrapez",
            lastMessage: "Cześć, czy mogę zamówić 10 ton blachy?",
        },
        {
            id: 2,
            recipient: "EkoBuda",
            lastMessage: "Witam, czy 10 000 pln wystarczy na realizacje?",
        },
        {
            id: 3,
            recipient: "Czysta Energia",
            lastMessage: "Dziękujemy za wykonanie zlecenia",
        }
    ]

    return (
        <main className="py-10">
            <Card className="max-w-[1400px] mx-auto px-4">
                <CardHeader>
                    <CardTitle className="text-2xl">Prowadzone konwersacje</CardTitle>
                </CardHeader>
                <Separator/>
                <CardContent>
                    <div className="flex flex-col gap-4 py-4">
                        {conversations.map((conversation) => (
                            <Link key={conversation.id} href={`/chat/${conversation.id}`}>
                                <Card
                                    className="cursor-pointer py-2 px-6 transition hover:shadow-none hover:text-red-700">
                                    <CardContent className="flex flex-col justify-center p-2">
                                        <h3 className="text-xl font-semibold">{conversation.recipient}</h3>
                                        <p className="text-gray-500">Ostatnia aktywność: {conversation.lastMessage}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}
