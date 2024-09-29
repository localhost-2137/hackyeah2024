import { getFaqAnswer } from "@/actions/faq";

export const FaqAnswer = async ({ questionId }: { questionId: string }) => {
    const { data } = await getFaqAnswer(questionId);

    return <p>{data}</p>;
}
