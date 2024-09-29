"use server";;
import {db} from "@/lib/db";
import {currentUser} from "@/lib/auth";
import {ElasticIndexes, elasticSearch} from "@/lib/elasticSearch";

import {userPublicFields} from "@/lib/userPublicFields";

interface UserData {
    name: string;
    email: string;
    description: string;
    image: string;
    tags: string[];
}

export async function updateSettings(data: UserData) {
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

    const newUserData = await db.user.update({
        where: {id: user.id},
        data: {
            ...data,
        },
        select: userPublicFields,
    });

    await elasticSearch.index({
        index: ElasticIndexes.UserIndex,
        id: user.id,
        document: newUserData,
    });
}


