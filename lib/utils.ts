import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { connectToDatabase } from "./mongoose";
import qs from "query-string";
import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: string | Date): string => {
  const now = new Date();
  const createdAtDate =
    typeof createdAt === "string" ? new Date(Date.parse(createdAt)) : createdAt;

  if (isNaN(createdAtDate.getTime())) {
    return "Invalid date";
  }

  const diff = now.getTime() - createdAtDate.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (weeks > 0) {
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return seconds <= 1 ? "just now" : `${seconds} seconds ago`;
  }
};

export function formatNumber(number: number): string {
  let suffix = "";
  let divisor = 1;

  if (number >= 1000000) {
    suffix = "M";
    divisor = 1000000;
  } else if (number >= 1000) {
    suffix = "K";
    divisor = 1000;
  }

  const formattedNumber = Math.floor(number / divisor) + suffix;
  return formattedNumber;
}

export function getJoinedDate(date: Date): string {
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${month} ${year}`;
}

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  try {
    const currentUrl = qs.parse(params);
    currentUrl[key] = value;
    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      { skipNull: true }
    );
  } catch (error) {}
}

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export function removeKeysFromQuery({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) {
  try {
    const currentUrl = qs.parse(params);

    keysToRemove.forEach((key) => {
      delete currentUrl[key];
    });

    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      { skipNull: true }
    );
  } catch (error) {}
}

interface BadgeParam {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}

export function assignBadges(params: BadgeParam) {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };
  const { criteria } = params;
  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels: any = BADGE_CRITERIA[type];
    Object.keys(badgeLevels).forEach((level: any) => {
      if (count >= badgeLevels[level]) {
        badgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  });
  return badgeCounts;
}
