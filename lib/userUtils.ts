import {UserType} from "@/actions/fulfill-user-data";

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
