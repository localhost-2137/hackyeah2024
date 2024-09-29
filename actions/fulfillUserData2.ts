"use server";

import {currentUser} from "@/lib/auth";
import {_fulfillUserData, UserDataToBeFulfilled} from "@/actions/fulfillUserData";


export async function fulfillUserData(data: UserDataToBeFulfilled) {
    const user = await currentUser();
    if (!user) {
        return {error: "User not found!"};
    }

    return _fulfillUserData(data.name, user.id!, data);
}


