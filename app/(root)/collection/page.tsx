import QuestionCard from "@/components/Cards/QuestionCard";
import Filter from "@/components/shared/Filters/Filter";
import NoResult from "@/components/shared/NoResult/NoResult";
import LocalSearchbar from "@/components/shared/Search/LocalSearchbar";
import { QuestionFilters } from "@/constants/filters";
import { getSavedQuestions } from "@/lib/actions/User.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";

export default async function Page({ searchParams }: SearchParamsProps) {
  const { userId } = auth();
  if (!userId) return null;

  const { questions } = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="flex w-full flex-col mt-10 gap-6">
        {questions.length > 0 ? (
          questions?.map((question) => (
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
            title="There are no questions saved to show"
            description="Be the first to break the silence! 🚀 Ask a question and kickstart the
        discussion. our query could be the next big thing other's learn
        from. Get Involved! 💡"
          />
        )}
      </div>
    </>
  );
}
