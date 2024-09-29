"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const getMessages = async (receiverId: string) => {
    const user = await currentUser();

    if (!user) {
        return {error: "User not found!"};
    }

    const messages = await db.chatMessage.findMany({
        where: {
            OR: [
                {
                    senderId: user.id,
                    receiverId,
                },
                {
                    senderId: receiverId,
                    receiverId: user.id,
                },
            ],
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    console.log(messages);

    return {data: messages.map((message) => ({
        id: message.id,
        isYourMessage: message.senderId === user.id,
        content: message.content,
        updatedAt: message.createdAt,
        type: message.type,
    }))};
};