"use server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

<<<<<<< HEAD
import {userPublicFields} from "@/lib/userPublicFields";

export async function getUser() {
    const user = await currentUser();
    if (!user) {
        return {error: "User not found!"};
    }
=======
export async function getUser(): Promise<
  any
> {
  const user = await currentUser();
  if (!user) {
    return { error: "User not found!" };
  }
>>>>>>> 280004f0f4b1a0658327625c243e95da41250680

  const userData = await db.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      email: true,
      emailVerified: true,
      name: true,
      description: true,
      type: true,
      image: true,
      tags: true,
      isFulfilled: true,
      updatedAt: true,
      createdAt: true,
    },
  });
  if (!userData) {
    return { error: "User data not found!" };
  }

    return {data: userData};
}

export async function getPublicUserData(userId: string) {
    const userData = await db.user.findUnique({
        where: {id: userId},
        select: userPublicFields,
    });
    if (!userData) {
        return {error: "User data not found!"};
    }

    return {data: userData};
}
