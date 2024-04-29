import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  imgUrl: string;
  href?: string;
  title: string;
}

const ProfileLink = ({ imgUrl, title, href }: Props) => {
  return (
    <div className="flex-center gap-1">
      <Image src={imgUrl} alt="icon" height={20} width={20} />
      {href ? (
        <Link
          href={href}
          target="_blank"
          className="text-blue-500 paragraph-medium"
        >
          {title}
        </Link>
      ) : (
        <p className="text-dark400_light700 paragraph-medium">{title}</p>
      )}
    </div>
  );
};

export default ProfileLink;
