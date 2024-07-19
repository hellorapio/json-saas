import { verifyEmail } from "@/db/repositories/tokens";
import CommonError from "./CommonError";
import Success from "./Success";
import { unstable_noStore } from "next/cache";

export default async function EmailVerification({
  token,
}: {
  token: string;
}) {
  unstable_noStore(); // When deleting tokens from the database, the cache should be invalidated
  const verifiedToken = await verifyEmail(token);
  return (
    <div>
      {verifiedToken ? (
        <Success message="Your email has been verified" />
      ) : (
        <CommonError message="Your token is either Invalid or expired token"></CommonError>
      )}
    </div>
  );
}
