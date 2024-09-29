"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { userPublicFields } from "@/lib/userPublicFields";

export const getLastMessages = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found!");
  }

  //get last message from every conversation

  const messages = await db.chatMessage.findMany({
    distinct: ["receiverId"],
    where: {
      OR: [
        {
          senderId: user.id,
        },
        {
          receiverId: user.id,
        },
      ],
    },
    include: {
      receiver: {
        select: userPublicFields,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(messages);

  const chats = messages.map((message) => ({
    id: message.receiver.id,
    recipient: message.receiver.name,
    lastMessage: message.content,
  }));

  return chats;
};
