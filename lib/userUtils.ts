import {UserType} from "@/actions/fulfillUserData";

export function getOppositeType(type: UserType): UserType {
    switch (type) {
        case "BUSINESS":
            return "NGO";
        case "NGO":
            return "BUSINESS";
        case "FREELANCER":
            return "BUSINESS";
    }
}
