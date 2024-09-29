"use server";

import {db} from "@/lib/db";
import {currentUser} from "@/lib/auth";

export type UserType = 'FREELANCER' | 'BUSINESS' | 'NGO';

interface UserDataToBeFulfilled {
    name: string;
    description: string;
    type: UserType;
    image: string;
    tags: string[];
}

export async function fulfillUserData(data: UserDataToBeFulfilled) {
    const user = await currentUser();
    if (!user) {
        return {error: "User not found!"};
    }

    if (data.name.length < 3) {
        return {error: "Name is too short!"};
    }
    if (!data.description.length) {
        return {error: "Description is required!"};
    }

    await db.user.update({
        where: {id: user.id},
        data: {
            ...data,
            isFulfilled: true,
        }
    });
}