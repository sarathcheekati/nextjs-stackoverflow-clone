import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers/AllAnswers";
import Metric from "@/components/shared/Metric/Metric";
import ParseHTML from "@/components/shared/ParseHTML/ParseHTML";
import RenderTag from "@/components/shared/Tag/RenderTag";
import Votes from "@/components/shared/Votes/Votes";
import { getQuestionById } from "@/lib/actions/Question.action";
import { getUserById } from "@/lib/actions/User.action";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params, searchParams }: any) => {
  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  const question = await getQuestionById({ questionId: params.id });
  return (
    <>
      <div className="w-full flex-col flex-start">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question?.author?.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question?.author?.picture}
              className="rounded-full"
              alt="profile"
              height={22}
              width={22}
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question?.author?.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="Question"
              itemId={JSON.stringify(question?._id)}
              userId={JSON.stringify(mongoUser?._id)}
              upvotes={question.upvotes.length}
              downvotes={question.downvotes.length}
              hasupVoted={question.upvotes.includes(mongoUser?._id)}
              hasdownVoted={question.downvotes.includes(mongoUser?._id)}
              hasSaved={mongoUser?.saved.includes(question._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question?.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={`asked ${getTimeStamp(question?.createdAt)}`}
          title=" Asked "
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatNumber(question?.answers.length)}
          title=" Answers "
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatNumber(question?.views)}
          title=" Views "
          textStyles="small-medium text-dark400_light800"
        />
      </div>
      <ParseHTML data={question?.content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {question?.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>
      <AllAnswers
        questionId={question?._id}
        userId={mongoUser?._id}
        totalAnswers={question?.answers?.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />
      <Answer
        question={question?.content}
        questionId={JSON.stringify(question?._id)}
        authorId={JSON.stringify(mongoUser?._id)}
      />
    </>
  );
};

export default Page;
