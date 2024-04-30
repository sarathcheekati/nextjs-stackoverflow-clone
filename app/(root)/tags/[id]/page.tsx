import QuestionCard from "@/components/Cards/QuestionCard";
import NoResult from "@/components/shared/NoResult/NoResult";
import LocalSearchbar from "@/components/shared/Search/LocalSearchbar";
import { IQuestion } from "@/database/question.model";
import { getQuestionsByTagId } from "@/lib/actions/Tag.actions";
import { URLProps } from "@/types";

const Page = async ({ params, searchParams }: URLProps) => {
  const { questions, tagTitle } = await getQuestionsByTagId({
    tagId: params?.id,
    page: 1,
    searchQuery: searchParams.q,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="flex w-full flex-col mt-10 gap-6">
        {questions.length > 0 ? (
          questions?.map((question: IQuestion) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            link="/ask-question"
            linkTitle="Ask a Question"
            title="There are no tag questions saved to show"
            description="Be the first to break the silence! 🚀 Ask a question and kickstart the
        discussion. our query could be the next big thing other's learn
        from. Get Involved! 💡"
          />
        )}
      </div>
    </>
  );
};

export default Page;
