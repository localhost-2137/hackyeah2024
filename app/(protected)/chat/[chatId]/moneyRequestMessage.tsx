import {Message} from "@/app/(protected)/chat/[chatId]/page";
import {Card, CardContent} from "@/components/ui/card";

export default function MoneyRequestMessage(props: { message: Message }) {

    const {message} = props

    return (
        <Card
            className={`px-4 py-2 text-white ${message.isYourMessage ? "ml-auto bg-red-500" : "mr-auto bg-gray-500"}`}>
            <CardContent className="p-0">
                <p>{message.content}</p>
                <p>Kwota: {message.money} PLN</p>
            </CardContent>
        </Card>
    )
}
