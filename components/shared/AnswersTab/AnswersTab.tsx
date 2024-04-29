import AnswerCard from "@/components/Cards/AnswerCard";
import { getUserAnswers } from "@/lib/actions/User.action";
import { SearchParamsProps } from "@/types";
import React from "react";
interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const { answers, totalAnswers } = await getUserAnswers({ userId, page: 1 });
  return (
    <>
      {answers?.map((answer) => (
        <AnswerCard
          key={answer._id}
          clerkId={clerkId}
          _id={answer._id}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes.length}
          createdAt={answer.createdAt}
        />
      ))}
    </>
  );
};

export default AnswersTab;
