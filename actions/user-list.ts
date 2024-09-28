"use server";

import {db} from "@/lib/db";
import {UserType} from "@/actions/fulfill-user-data";

export function getUserList(take: number, skip: number, userType: UserType | UserType[]) {
    const type = Array.isArray(userType) ? userType : [userType];

    return db.user.findMany({
        take,
        skip,
        where: {
            type: {in: type},
            isFulfilled: true,
            emailVerified: {
                not: null
            },
        },
        select: {
            id: true,
            email: true,
            name: true,
            description: true,
            image: true,
            tags: true,
            updatedAt: true,
            createdAt: true,
        }
    });
}