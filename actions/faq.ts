"use server";
import {db} from "@/lib/db";
import {gemini} from "@/lib/gemini";
import {UserType} from "@prisma/client";
import {getOppositeType} from "@/lib/userUtils";

export async function getFaqAnswer(questionId: string) {
    const faqQuestion = await db.faqQuestion.findUnique({
        where: {id: questionId},
        select: {
            question: true,
            answer: true,
            user: {
                select: {
                    name: true,
                    description: true,
                    type: true,
                },
            }
        }
    });
    if (!faqQuestion) {
        return {error: "Question not found!"};
    }

    if (faqQuestion.answer) {
        return {data: faqQuestion.answer};
    }

    const answer = await generateFaqAnswer(faqQuestion.user.name!, faqQuestion.user.description!, faqQuestion.user.type!, faqQuestion.question);
    await db.faqQuestion.update({
        where: {id: questionId},
        data: {answer},
    });

    return {data: answer};
}

async function generateFaqAnswer(name: string, description: string, type: UserType, question: string): Promise<string> {
    const model = gemini.getGenerativeModel({model: "gemini-1.0-pro-latest"});

    const prompt = `The institution ${getOppositeType(type)} wants to know more about
        \`${name}\` which is a ${type} institution. Based on the THE INTERNET ONLINE DATA and the following description:
        \`\`\`${description}\`\`\`, generate an answer to the question: \`${question}\`.
        Return just and ONLY the answer. Your response should be in Polish.
    `;

    const response = await model.generateContent(prompt);

    return response.response.text();
}