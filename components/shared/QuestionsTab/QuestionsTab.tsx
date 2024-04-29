import QuestionCard from "@/components/Cards/QuestionCard";
import { getUserQuestions } from "@/lib/actions/User.action";
import { SearchParamsProps } from "@/types";
import React from "react";
interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionsTab = async ({ searchParams, userId, clerkId }: Props) => {
  const { questions, totalQuestions } = await getUserQuestions({
    userId,
    page: 1,
  });
  return (
    <>
      {questions?.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}
    </>
  );
};

export default QuestionsTab;
