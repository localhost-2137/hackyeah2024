import {Message} from "@/app/(protected)/chat/[chatId]/page";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";

export default function RequirementsMessage(props: { message: Message }) {

    const {message} = props

    return (
        <Card
            className={`px-4 py-2 text-white ${message.isYourMessage ? "ml-auto bg-red-500" : "mr-auto bg-gray-500"}`}>
            <CardContent className="p-0">
                <p>{message.content}</p>
                <form>
                    <ul>
                        {message.requirements && message.requirements.map((requirement) => (
                            <li key={requirement.id} className="flex flex-row gap-2 items-center py-3">
                                <Checkbox/>
                                <div>
                                    <h3>{requirement.name}</h3>
                                    <p>{requirement.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </form>
            </CardContent>
        </Card>
    )
}
