import { findTokenByTokenAndType } from "@/db/repositories/tokens";
import NewPasswordForm from "./NewPasswordForm";
import CommonError from "./CommonError";

type Props = {
  token: string;
};

export default async function ResetPasswordWrapper({ token }: Props) {
  const passwordToken = await findTokenByTokenAndType(
    token,
    "Password-Reset"
  );
  return (
    <>
      {passwordToken.length > 0 ? (
        <>
          <h1 className="text-2xl font-semibold text-center">
            Reset your password
          </h1>
          <div className="flex justify-center">
            <NewPasswordForm token={token} />
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <CommonError message="Your token is either Invalid or expired token"></CommonError>
        </div>
      )}
    </>
  );
}
