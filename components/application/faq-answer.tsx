import { getFaqAnswer } from "@/actions/faq";

export const FaqAnswer = async ({ questionId }: { questionId: string }) => {
    const { data } = await getFaqAnswer(questionId);

    console.log('test');

    return <p>{data}</p>;
}
