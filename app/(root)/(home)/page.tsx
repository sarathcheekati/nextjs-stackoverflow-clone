import QuestionCard from "@/components/Cards/QuestionCard";
import HomeFilters from "@/components/Home/HomeFilters";
import Filter from "@/components/shared/Filters/Filter";
import NoResult from "@/components/shared/NoResult/NoResult";
import Pagination from "@/components/shared/Pagination/Pagination";
import LocalSearchbar from "@/components/shared/Search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/Question.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import Loading from "./loading";

export default async function Home({ searchParams }: SearchParamsProps) {
  const { questions, isNext } = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] py-3 px-4 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
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
            title="There are no questions to show"
            description="Be the first to break the silence! 🚀 Ask a question and kickstart the
        discussion. our query could be the next big thing other's learn
        from. Get Involved! 💡"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
}
