"use server";

import {db} from "@/lib/db";
import {UserType} from "@/actions/fulfill-user-data";
import {ElasticIndexes, elasticSearch} from "@/lib/elasticSearch";
import {currentUser} from "@/lib/auth";

<<<<<<< HEAD
export async function getUserList(take: number, skip: number, userType: UserType | UserType[]) {
    const type = Array.isArray(userType) ? userType : [userType];
    const user = await currentUser();

    const recommendedUsersPromise = elasticSearch.search({
        index: ElasticIndexes.UserIndex,
        query: {
            bool: {
                must: {
                    terms: {type},
                },
                filter: {
                    term: {
                        isFulfilled: true,
                    },
                },
                should: {
                    more_like_this: {
                        fields: ["name", "description", "tags"],
                        like: [
                            {
                                _index: ElasticIndexes.UserIndex,
                                _id: user?.id,
                            },
                        ],
                        min_term_freq: 1,
                        min_doc_freq: 1,
                    },
                },
            },
        },
        size: take,
        from: skip,
    });

    let elasticUserIds: string[] = [];
    try {
        elasticUserIds = (await recommendedUsersPromise).hits.hits
            .map((hit) => hit._id)
            .filter((id) => typeof id === "string");

    } catch (error: any) {
        // if statusCode is not 404, throw the error
        if (!error?.meta || error.meta.statusCode !== 404) {
            throw error;
        }
    }

    return db.$queryRaw`
      SELECT "id", "email", "name", "description", "type", "image", "tags", "updatedAt", "createdAt"
      FROM "User"
      WHERE "type"::text = ANY(${type})
        AND "isFulfilled" = true 
        AND "emailVerified" IS NOT NULL
      ORDER BY
        CASE
          WHEN "id" = ANY(${elasticUserIds}) THEN 1
          ELSE 2
        END,
        "id" ASC
      LIMIT ${take} OFFSET ${skip}
    `;
}
=======
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
    return users;
}
>>>>>>> 280004f0f4b1a0658327625c243e95da41250680
