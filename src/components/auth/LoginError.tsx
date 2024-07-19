import CommonError from "./CommonError";

export default function LoginError({ message }: { message: string }) {
  const error =
    message === "OAuthCallbackError"
      ? "Logging in has been cancelled"
      : message === "OAuthSigninError"
      ? "Failed to sign in"
      : message === "OAuthAccountNotLinked"
      ? "Use the same provider you used to sign up"
      : "Something Went Wrong";

  return <CommonError message={error} />;
}
