"use client";;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdSend } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import TextMessage from "@/app/(protected)/chat/[chatId]/textMessage";
import MoneyRequestMessage from "@/app/(protected)/chat/[chatId]/moneyRequestMessage";
import RequirementsMessage from "@/app/(protected)/chat/[chatId]/requirementsMessage";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPublicUserData } from "@/actions/user-data";
import { sendMessage } from "@/actions/send-message";
import { getMessages } from "@/actions/get-messages";

let socket;


export interface Message {
    id: string
    content: string,
    isYourMessage: boolean,
    updatedAt?: string,
    type: "TEXT" | "requirements" | "moneyRequest",
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
    const params = useParams();

    const [chatData, setChatData] = useState<IChatData | null>(null);
    const [messageContent, setMessageContent] = useState<string>("");


    const fetchUser = useCallback(() => {
        getPublicUserData(params.chatId as string).then((data) => {
            if (!data) return;
            setChatData({
                messages: [],
                recipient: data.data!.name || "",
            });
        });
    }, [params.chatId]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    
    const fetchMessages = useCallback(() => {
        getMessages(params.chatId as string).then((data) => {
            if (!data) return;
            console.log(data);
            setChatData({
                messages: data.data!,
                recipient: chatData!.recipient,
            });
        });
    }, [params.chatId, chatData]);
    
    useEffect(() => {
        //fetch every 5 seconds
        const interval = setInterval(() => {
            fetchMessages();
        }, 5000);
        return () => clearInterval(interval);
    }, [fetchMessages]);

    const sendMessageHandler = () => {
        setChatData({
            messages: [
                ...chatData!.messages,
                {
                    id: String(Math.random()),
                    content: messageContent,
                    isYourMessage: true,
                    type: "TEXT"
                }
            ],
            recipient: chatData!.recipient
        });
        setMessageContent("");
        sendMessage({
            receiverId: params.chatId,
            content: messageContent,
            type: "TEXT",
        });
    };

    // const chatData: IChatData = {
    //     messages: [
    //         {
    //             id: 1,
    //             content: "Witaj, jesteśmy chętni podjąć współpracę.",
    //             isYourMessage: true,
    //             type: "text"
    //         }, {
    //             id: 2,
    //             content: "Cześć, to są nasze wymagania biznesowe.",
    //             requirements: [
    //                 {
    //                     id: 1,
    //                     name: "Wymaganie 1",
    //                     description: "Opis wymagania 1"
    //                 },
    //                 {
    //                     id: 2,
    //                     name: "Wymaganie 2",
    //                     description: "Opis wymagania 2"
    //                 },
    //                 {
    //                     id: 3,
    //                     name: "Wymaganie 3",
    //                     description: "Opis wymagania 3"
    //                 }
    //             ],
    //             isYourMessage: false,
    //             type: "requirements"
    //         }, {
    //             id: 3,
    //             content: "Akceptujemy warunki, jednakże potrzebujemy dotacji.",
    //             type: "moneyRequest",
    //             isYourMessage: true,
    //             money: 10000
    //         }
    //     ],
    //     recipient: "Blachotrapez"
    // }

    if (!chatData) return <div>Ładowanie...</div>

    return (
        <main className="py-10 px-5 max-w-[1400px] mx-auto flex flex-col gap-4">
            <Card className="px-10 py-5 min-h-[600px]">
                <CardHeader>
                    <CardTitle className="text-2xl">Czat z {chatData.recipient}</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="flex flex-col gap-4 py-4 overflow-scroll">
                    {
                        chatData.messages.map((message) => {

                            if (message.type === "TEXT") {
                                return <TextMessage key={message.id} message={message} />
                            }

                            if (message.type === "requirements") {
                                return <RequirementsMessage key={message.id} message={message} />
                            }

                            if (message.type === "moneyRequest") {
                                return <MoneyRequestMessage key={message.id} message={message} />
                            }

                        })
                    }
                </CardContent>
            </Card>
            <Card className="flex flex-row gap-4 p-4">
                <Input placeholder="Wpisz wiadomość..." value={messageContent} onChange={(e) => setMessageContent(e.target.value)} />
                <Button className="bg-red-700 hover:bg-red-500" onClick={sendMessageHandler}><MdSend /></Button>
            </Card>
        </main>
    )
}
