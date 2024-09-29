import {Card, CardContent} from "@/components/ui/card";
import {Message} from "@/app/(protected)/chat/[chatId]/page";

export default function TextMessage(props: { message: Message }) {

    const {message} = props

    return (
        <Card
            className={`px-4 py-2 text-white ${message.isYourMessage ? "ml-auto bg-red-500" : "mr-auto bg-gray-500"}`}>
            <CardContent className="p-0">
                <p>{message.content}</p>
            </CardContent>
        </Card>)
}
