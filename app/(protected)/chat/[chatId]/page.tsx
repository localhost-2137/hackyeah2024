"use client";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {MdSend} from "react-icons/md";
import {Separator} from "@/components/ui/separator";
import TextMessage from "@/app/(protected)/chat/[chatId]/textMessage";
import MoneyRequestMessage from "@/app/(protected)/chat/[chatId]/moneyRequestMessage";
import {useCallback, useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {getPublicUserData} from "@/actions/user-data";
import {sendMessage} from "@/actions/send-message";
import {getMessages} from "@/actions/get-messages";
import {Skeleton} from "@/components/ui/skeleton";

export interface Message {
    id: string,
    content: string
    isYourMessage: boolean
    type: "TEXT" | "CONTRACT"
    updatedAt: Date,
    contract?: any
}

interface ChatData {
    data: Message[]
    recipient?: string
}


export default function ChatPage() {
    const params = useParams();

    const [chatData, setChatData] = useState<ChatData | null>({
        data: [],
        recipient: ""
    });
    const [messageContent, setMessageContent] = useState<string>("");


    const fetchUser = useCallback(() => {
        let messages: any = [];
        getMessages(params.chatId as string).then((data) => {
            if (!data) return;
            messages = data.data!;
        });
        getPublicUserData(params.chatId as string).then((data) => {
            if (!data) return;
            setChatData({
                data: chatData?.data && chatData!.data.length === 0 ? messages : chatData!.data,
                recipient: data.data!.name || "",
            });
        });
    }, [params.chatId]);

    const fetchMessages = useCallback(() => {
        getMessages(params.chatId as string).then((data) => {
            if (!data) return;
            setChatData({
                data: data.data!,
                recipient: chatData!.recipient,
            });
        });
    }, [params.chatId, chatData]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        //fetch every 5 seconds
        const interval = setInterval(() => {
            fetchMessages();
        }, 5000);
        return () => clearInterval(interval);
    }, [fetchMessages]);

    const sendMessageHandler = () => {
        setChatData((prevState: any) => {
            return {
                data: [
                    ...prevState!.data,
                    {
                        id: String(Math.random()),
                        content: messageContent,
                        isYourMessage: true,
                        type: "TEXT"
                    }
                ],
                recipient: chatData!.recipient
            }
        });
        setMessageContent("");
        sendMessage({
            receiverId: params.chatId,
            content: messageContent,
            type: "TEXT",
        });
    };

    return (
        <main className="py-10 px-5 max-w-[1400px] mx-auto flex flex-col gap-4">
            <Card className="px-10 py-5 min-h-[600px]">
                <CardHeader>
                    <CardTitle className="text-2xl">Czat z {chatData!.data.length > 0 ? chatData!.recipient : "użytkownik"}</CardTitle>
                </CardHeader>
                <Separator/>
                <CardContent className="flex flex-col gap-4 py-4 overflow-scroll">
                    {
                        chatData!.data.length > 0 ? chatData!.data.map((message) => {

                            if (message.type === "TEXT") {
                                return <TextMessage key={message.id} message={message}/>
                            }


                            if (message.type === "CONTRACT") {
                                return <MoneyRequestMessage key={message.id} message={message}/>
                            }

                        }) : <Skeleton className="w-[100px] h-[20px] rounded-full"/>
                    }
                </CardContent>
            </Card>
            <Card className="flex flex-row gap-4 p-4">
                <Input placeholder="Wpisz wiadomość..." value={messageContent}
                       onChange={(e) => setMessageContent(e.target.value)}/>
                <Button className="bg-red-700 hover:bg-red-500" onClick={sendMessageHandler}><MdSend/></Button>
            </Card>
        </main>
    )
}
