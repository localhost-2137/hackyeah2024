"use server";

import {db} from "@/lib/db";
import {UserType} from "@/actions/fulfill-user-data";

export async function getUserList(take: number, skip: number, userType?: UserType) {    
    const type = userType ? [userType] : [];
    const whereParams: any = {
        isFulfilled: true,
        emailVerified: {
            not: null
        },
    };
    if (type.length > 0) {
        whereParams['type'] = {
            in: type
        };
    }
    console.log(whereParams);

    const users = await db.user.findMany({
        take,
        skip,
        where: whereParams,
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
    console.log(users);
    return users;   
}