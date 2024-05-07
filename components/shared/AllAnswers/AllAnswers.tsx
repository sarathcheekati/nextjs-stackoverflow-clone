import Filter from "../Filters/Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/Answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimeStamp } from "@/lib/utils";
import ParseHTML from "../ParseHTML/ParseHTML";
import Votes from "../Votes/Votes";
import Pagination from "../Pagination/Pagination";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const { answers, isNext } = await getAnswers({
    sortBy: filter,
    questionId,
    page: page ? +page : 1,
  });
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>
      <div>
        {answers?.map((answer) => (
          <article key={answer?._id} className="light-border border-b py-10">
            <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/profile/${answer.author.clerkId}`}
                className="flex flex-1 items-start gap-1 sm:items-center"
              >
                <Image
                  src={answer.author.picture}
                  alt="profile"
                  width={18}
                  height={18}
                  className="rounded-full object-cover max-sm:mt-0.5"
                />
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700 mr-1">
                    {answer.author.name}
                  </p>
                  <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1 ml-0.5">
                    answered {getTimeStamp(answer.createdAt)}
                  </p>
                </div>
              </Link>
              <div className="flex justify-end ">
                <Votes
                  type="Answer"
                  itemId={JSON.stringify(answer?._id)}
                  userId={JSON.stringify(userId)}
                  upvotes={answer.upvotes.length}
                  downvotes={answer.downvotes.length}
                  hasupVoted={answer.upvotes.includes(userId)}
                  hasdownVoted={answer.downvotes.includes(userId)}
                />
              </div>
            </div>

            <ParseHTML data={answer?.content} />
          </article>
        ))}
      </div>
      <div className="mt-10">
        <Pagination pageNumber={page ? +page : 1} isNext={isNext} />
      </div>
    </div>
  );
};

export default AllAnswers;
