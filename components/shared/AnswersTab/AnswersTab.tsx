import AnswerCard from "@/components/Cards/AnswerCard";
import { getUserAnswers } from "@/lib/actions/User.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import Pagination from "../Pagination/Pagination";
interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const { answers, totalAnswers, isNext } = await getUserAnswers({
    userId,
    page: searchParams?.page ? +searchParams.page : 1,
  });
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
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
};

export default AnswersTab;
