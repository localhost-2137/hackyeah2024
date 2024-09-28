"use server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getUser(): Promise<
  any
> {
  const user = await currentUser();
  if (!user) {
    return { error: "User not found!" };
  }

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
        select: {
            id: true,
            email: true,
            name: true,
            description: true,
            type: true,
            image: true,
            tags: true,
            updatedAt: true,
            createdAt: true,
        }
    });
    if (!userData) {
        return {error: "User data not found!"};
    }

    return {data: userData};
}
