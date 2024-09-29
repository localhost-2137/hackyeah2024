import {Card, CardHeader, CardTitle} from "@/components/ui/card";

export default function ChatPage() {

    // const chatData = await getChatData

    const chatData = {
        messages: [],
    }

    return (
        <main>
            <Card>
                <CardHeader>
                    <CardTitle>Czat z </CardTitle>
                </CardHeader>
            </Card>
        </main>
    )
}
