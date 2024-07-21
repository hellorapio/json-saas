import { useSearchParams } from "next/navigation";
import CommonError from "./CommonError";

export default function LoginParamError() {
  const params = useSearchParams();
  const paramError = params.get("error");

  const error =
    paramError === "OAuthCallbackError"
      ? "Logging in has been cancelled"
      : paramError === "OAuthSigninError"
      ? "Failed to sign in"
      : paramError === "OAuthAccountNotLinked"
      ? "Use the same provider you used to sign up"
      : "Something Went Wrong";

  if (!paramError) return null;

  return <CommonError message={error} />;
}
