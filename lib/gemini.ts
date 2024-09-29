import {GoogleGenerativeAI} from "@google/generative-ai";

declare global {
    var geminiClient: GoogleGenerativeAI | undefined;
}

export const gemini = globalThis.geminiClient || new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

if (process.env.NODE_ENV !== "production") globalThis.geminiClient = gemini;
