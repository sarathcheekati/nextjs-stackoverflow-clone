import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/lib/actions/User.action";
import { URLProps } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { auth, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getJoinedDate } from "@/lib/utils";
import ProfileLink from "@/components/shared/ProfileLink/ProfileLink";
import Stats from "@/components/shared/Stats/Stats";
import QuestionsTab from "@/components/shared/QuestionsTab/QuestionsTab";
import AnswersTab from "@/components/shared/AnswersTab/AnswersTab";
import { userInfo } from "os";

const Page = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();

  const { user, totalQuestions, totalAnswers, badgeCount, reputation } =
    await getUserInfo({
      userId: params?.id,
    });
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={user?.picture}
            height={140}
            width={140}
            alt="profile picture"
            className="rounded-full object-cover"
          />
          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{user?.name}</h2>
            <p className="paragraph-regular text-dark200_light800">
              @{user?.username}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {user?.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={user?.location}
                />
              )}
              {user?.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={user?.portfolioWebsite}
                  title="Portfolio"
                />
              )}
              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(user?.joinedAt)}
              />
            </div>
            {user?.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {user.bio}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 sm:mt-3 max-sm:w-full">
          <SignedIn>
            {clerkId === user?.clerkId && (
              <Link href="/profile/edit">
                <Button className="px-4 py-3 paragraph-medium btn-secondary text-dark200_light900 min-h-[46px] min-w-[175px]">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <Stats
        reputation={reputation}
        badges={badgeCount}
        totalQuestions={totalQuestions}
        totalAnswers={totalAnswers}
      />
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <QuestionsTab
              searchParams={searchParams}
              userId={user._id}
              clerkId={clerkId}
            />
          </TabsContent>
          <TabsContent value="answers" className="flex w-full gap-6 flex-col">
            <AnswersTab
              searchParams={searchParams}
              userId={user._id}
              clerkId={clerkId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
