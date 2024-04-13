import QuestionCard from "@/components/Cards/QuestionCard";
import HomeFilters from "@/components/Home/HomeFilters";
import Filter from "@/components/shared/Filters/Filter";
import NoResult from "@/components/shared/NoResult/NoResult";
import LocalSearchbar from "@/components/shared/Search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "How to optimize React component rendering?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "Performance" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      picture: "https://example.com/john_doe.jpg",
    },
    upvotes: 20,
    views: 150,
    answers: [],
    createdAt: new Date("2024-04-13T08:00:00.000Z"),
  },
  {
    _id: "2",
    title: "Best practices for securing Node.js applications?",
    tags: [
      { _id: "3", name: "Node.js" },
      { _id: "4", name: "Security" },
    ],
    author: {
      _id: "2",
      name: "Jane Smith",
      picture: "https://example.com/jane_smith.jpg",
    },
    upvotes: 15,
    views: 120,
    answers: [],
    createdAt: new Date("2024-04-13T08:00:00.000Z"),
  },
  {
    _id: "3",
    title: "How to deploy a React app on AWS?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "5", name: "AWS" },
    ],
    author: {
      _id: "3",
      name: "Alice Johnson",
      picture: "https://example.com/alice_johnson.jpg",
    },
    upvotes: 250000000,
    views: 18000,
    answers: [],
    createdAt: new Date("2024-04-11T15:45:00.000Z"),
  },
  {
    _id: "4",
    title: "How to implement authentication in a Next.js app?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "6", name: "Next.js" },
      { _id: "4", name: "Security" },
    ],
    author: {
      _id: "4",
      name: "Michael Brown",
      picture: "https://example.com/michael_brown.jpg",
    },
    upvotes: 18,
    views: 130,
    answers: [],
    createdAt: new Date("2024-04-10T12:15:00.000Z"),
  },
  {
    _id: "5",
    title: "How to handle state management in a large React application?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "7", name: "State Management" },
    ],
    author: {
      _id: "5",
      name: "Emily Wilson",
      picture: "https://example.com/emily_wilson.jpg",
    },
    upvotes: 22,
    views: 160,
    answers: [],
    createdAt: new Date("2024-04-09T09:20:00.000Z"),
  },
];

export default function Home() {
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
          questions.map((question) => (
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
    </>
  );
}
