"use server";

import {db} from "@/lib/db";
import {currentUser} from "@/lib/auth";
import {userPublicFields} from "@/lib/userPublicFields";
import {gemini} from "@/lib/gemini";

interface CompatibilityRetData {
    rating: number,
    description: string,
}

interface CompatibilityRet {
    data?: CompatibilityRetData,
    error?: string,
}

export default async function partnershipCompatibility(potentialPartnerId: string): Promise<CompatibilityRet> {
    const user = await currentUser();
    if (!user) {
        return {error: "User not found!"};
    }

    const userPromise = db.user.findUnique({
        where: {id: user.id},
        select: userPublicFields,
    });

    const potentialPartnerPromise = db.user.findUnique({
        where: {id: potentialPartnerId},
        select: userPublicFields,
    });

    const [userData, potentialPartnerData] = await db.$transaction([userPromise, potentialPartnerPromise]);

    if (!userData || !potentialPartnerData) {
        return {error: "User data not found!"};
    }

    const compatibilityData = await generateAiCompatibility(userData, potentialPartnerData);
    return {data: compatibilityData};
}

async function generateAiCompatibility(userData: any, potentialPartnerData: any): Promise<CompatibilityRetData> {
    const model = gemini.getGenerativeModel({model: "gemini-1.0-pro-latest"});

    const promptTemplate = `The institution ${userData.name} is a ${userData.type} institution with the following description
        \`\`\`${userData.description}\`\`\` and the following tags: \`${userData.tags.join(', ')}\`. The institution ${potentialPartnerData.name} is a ${potentialPartnerData.type} institution with the following description
        \`\`\`${potentialPartnerData.description}\`\`\` and the following tags: \`${potentialPartnerData.tags.join(', ')}\`. Based on this information AND THE INTERNET ONLINE DATA, `;

    const descriptionResPrompt = `${promptTemplate}generate a compatibility description of the partnership between these two institutions. The response should be in Polish.`;
    const ratingResPrompt = `${promptTemplate}generate a compatibility rating of the partnership between these two institutions. The response should be just and ONLY a number 
    between 0 and 100. Do not reply with anything else no matter what`;

    const [descriptionRes, ratingRes] = await Promise.all([
        model.generateContent(descriptionResPrompt),
        model.generateContent(ratingResPrompt),
    ]);

    return {
        rating: aiResponseToNumber(ratingRes.response.text()),
        description: descriptionRes.response.text(),
    };
}

function aiResponseToNumber(response: string): number {
    const res = (new Array(response.trim())).filter(char => !isNaN(+char)).join("");
    return parseInt(res, 10);
}