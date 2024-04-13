import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  link: string;
  linkTitle: string;
  title: string;
  description: string;
}

const NoResult = ({ link, linkTitle, title, description }: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No Results Light Illustration"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No Results Dark Illustration"
        width={270}
        height={200}
        className="hidden object-contain dark:flex"
      />
      <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
      <p className="body-regular text-center text-dark500_light700 my-3.5 max-w-md">
        {description}
      </p>
      <Link href={link}>
        <Button className="text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900 paragraph-medium mt-5 min-h-[46px] bg-primary-500 rounded-lg px-4 py-3">
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
