import Image from "next/image";
import Link from "next/link";
import RenderTag from "../Tag/RenderTag";

const hotQuestions = [
  { _id: 1, title: "How do i use express as a custom server in next js" },
  { _id: 2, title: "cascading delete in sql schema" },
  { _id: 3, title: "How do i use express as a custom server in next js" },
  { _id: 4, title: "How do i use express as a custom server in next js" },
  { _id: 5, title: "How do i use express as a custom server in next js" },
];

const popularTags = [
  { _id: 1, name: "Javascript", totalQuestions: 5 },
  { _id: 2, name: "React", totalQuestions: 2 },
  { _id: 3, name: "Node", totalQuestions: 3 },
  { _id: 4, name: "HTML", totalQuestions: 4 },
  { _id: 5, name: "Next JS", totalQuestions: 6 },
];

const RightSidebar = () => {
  return (
    <section className="sticky background-light900_dark200 light-border right-0 top-0 flex flex-col overflow-y-auto h-screen border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden w-[350px] custom-scrollbar">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron-right"
                height={20}
                width={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="flex flex-col gap-4 mt-7">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
