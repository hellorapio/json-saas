import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type TokenType = "Email-Verification" | "Password-Reset";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function linkBuilder(token: string, type: TokenType) {
  if (type === "Email-Verification")
    return `${
      process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8082"
    }/email-verification/${token}`;
  else
    return `${
      process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8082"
    }/reset/${token}`;
}
