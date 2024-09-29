"use server";

import {db} from "@/lib/db";
import {UserType} from "@prisma/client";
import {ElasticIndexes, elasticSearch} from "@/lib/elasticSearch";
import {currentUser} from "@/lib/auth";

export async function getUserList(
    take: number,
    skip: number,
    userType?: UserType | UserType[]
) {
    const type = userType
        ? Array.isArray(userType)
            ? userType
            : [userType]
        : ["FREELANCER", "BUSINESS", "NGO"];
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
        console.error("Error fetching recommended users", error);
        console.warn("We're not using ElasticSearch to fetch recommended users");
    }

    // TODO: Make it exactly the same order as in the ElasticSearch query
    const dbRes: any[] = await db.$queryRaw`
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

    const dbResMap = new Map();
    dbRes.forEach((res) => {
        dbResMap.set(res.id, res);
    });

    const orderedDbRes: any[] = [];
    elasticUserIds.forEach((id) => {
        if (dbResMap.has(id)) {
            orderedDbRes.push(dbResMap.get(id));
            dbResMap.delete(id);
        }
    });

    dbResMap.forEach((res) => {
        orderedDbRes.push(res);
    });

    return orderedDbRes;
}
