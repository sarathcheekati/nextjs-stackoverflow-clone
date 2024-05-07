import Image from "next/image";
import Link from "next/link";
import RenderTag from "../Tag/RenderTag";
import { getHotQuestions } from "@/lib/actions/Question.action";
import { getTopPopularTags } from "@/lib/actions/Tag.actions";

const RightSidebar = async () => {
  //@ts-ignore
  const { hotQuestions } = await getHotQuestions();
  //@ts-ignore
  const { popularTags } = await getTopPopularTags();
  return (
    <section className="sticky background-light900_dark200 light-border right-0 top-0 flex flex-col overflow-y-auto h-screen border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden w-[350px] custom-scrollbar">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question: any) => (
            <Link
              href={`/question/${question._id}`}
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
          {popularTags.map((tag: any) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.numberOfQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
