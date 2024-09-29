"use server";

import { db } from "@/lib/db";
import {ElasticIndexes, elasticSearch} from "@/lib/elasticSearch";

export async function search(searchValue: string, take: number, skip: number) {
    const searchResults = await elasticSearch.search({
        index: ElasticIndexes.UserIndex,
        query: {
            match: {
                name: searchValue,
                tags: searchValue,
            },
            more_like_this: {
                fields: ["name", "description", "tags"],
                like: searchValue,
                min_term_freq: 1,
                min_doc_freq: 1,
            },
        },
    });

    const resultIds = searchResults.hits.hits.map((hit) => hit._id);

    const dbRes: any[] = await db.$queryRaw`
      SELECT "id", "email", "name", "description", "type", "image", "tags", "updatedAt", "createdAt"
      FROM "User"
      WHERE "isFulfilled" = true 
        AND "emailVerified" IS NOT NULL
      ORDER BY
        CASE
          WHEN "id" = ANY(${resultIds}) THEN 1
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
    resultIds.forEach((id) => {
        if (dbResMap.has(id)) {
            orderedDbRes.push(dbResMap.get(id));
        }
    });

    return orderedDbRes;
}