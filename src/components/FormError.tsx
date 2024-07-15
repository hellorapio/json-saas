import { BiSolidError } from "react-icons/bi";

export default function FormError({ message }: { message: string }) {
  return (
    <div className="text-destructive-foreground text-sm bg-destructive p-4 rounded-lg flex items-center gap-2">
      <BiSolidError className="w-5 h-5 " />
      <span>
        {message === "OAuthCallbackError"
          ? "Logging in has been cancelled"
          : message === "OAuthSigninError"
          ? "Failed to sign in"
          : message === "OAuthAccountNotLinked"
          ? "Use the same provider you used to sign up"
          : "Something Went Wrong"}
      </span>
    </div>
  );
}
