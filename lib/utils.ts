import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
