"use server";

import {db} from "@/lib/db";
import {currentUser} from "@/lib/auth";
import {ElasticIndexes, elasticSearch} from "@/lib/elasticSearch";
import {userPublicFields} from "@/lib/userPublicFields";
import {gemini} from "@/lib/gemini";
import {getOppositeType} from "@/lib/userUtils";

export type UserType = 'FREELANCER' | 'BUSINESS' | 'NGO';
const MIN_FAQ_QUESTION_COUNT = 7;
const FAILED_RETRY_LIMIT = 3;

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

    const faqQuestions = await generateFaqQuestions(data.name, data.description, data.type);

    const prismaTransactions = [];

    for (const question of faqQuestions) {
        prismaTransactions.push(
            db.faqQuestion.create({
                data: {
                    question,
                    userId: user.id!,
                },
            }),
        );
    }

    await db.$transaction(prismaTransactions);

    const newUserData = await db.user.update({
        where: {id: user.id},
        data: {
            ...data,
            isFulfilled: true,
        },
        select: userPublicFields,
    });

    await elasticSearch.index({
        index: ElasticIndexes.UserIndex,
        id: user.id,
        document: newUserData,
    });
}

export async function generateFaqQuestions(name: string, description: string, type: UserType, recursionCount = 0): Promise<string[]> {
    const model = gemini.getGenerativeModel({model: "gemini-1.0-pro-latest"});

    const prompt = `Generate interesting FAQ questions in Polish for \`${name}\` institution based on the following description: \`\`\`${description}\`\`\`. Focus on questions that would be relevant to potential partners.
    Please generate a valid JSON string array containing unique strings. Ensure that the output is always a properly formatted JSON array, like this: ["string1", "string2", "string3"]. Avoid any additional text or explanation. Just provide the JSON string array.
    The array should have at least ${MIN_FAQ_QUESTION_COUNT} questions and less than ${2*MIN_FAQ_QUESTION_COUNT}.
    Based your answers on internet online research.
    Remember that all of your answers are about ${type} institutions and they are ment to help ${getOppositeType(type)} institutions to understand the ${type} institutions better.
    `;

    const response = await model.generateContent(prompt);

    try {
        let questions = JSON.parse(response.response.text());
        if (!Array.isArray(questions)) {
            throw new Error("Invalid response, expected an array.");
        }

        questions = questions.filter((question) => typeof question === "string" && question?.length > 0);
        if (questions.length === 0 && recursionCount <= FAILED_RETRY_LIMIT) {
            throw new Error("No questions generated.");
        }

        return questions;
    } catch (e) {
        if (recursionCount > FAILED_RETRY_LIMIT) {
            throw e;
        }
        console.error("Failed to parse generated questions, retrying", e);
        return generateFaqQuestions(name, description, type, recursionCount + 1);
    }
}
