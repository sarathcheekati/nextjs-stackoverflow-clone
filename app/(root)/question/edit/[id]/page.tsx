import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/Question.action";
import { getUserById } from "@/lib/actions/User.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();
  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  const question = await getQuestionById({ questionId: params.id });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Page</h1>
      <div className="mt-9">
        <Question
          type="Edit"
          mongoUserId={mongoUser._id}
          questionDetails={JSON.stringify(question)}
        />
      </div>
    </>
  );
};

export default Page;
