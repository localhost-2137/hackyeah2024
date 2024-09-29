"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function sendMessage(data: any) {
  const user = await currentUser();
  if (!user) {
    return { error: "User not found!" };
  }

  await db.chatMessage.create({
    data: {
      sender: { connect: { id: user.id } },
      receiver: { connect: { id: data.receiverId } },
      content: data.content,
      type: data.type,
    },
  });

  return { data: "Message sent!" };
}
