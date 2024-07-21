import ResetPasswordWrapper from "@/components/auth/ResetPasswordWrapper";
import { Suspense } from "react";
import { PulseLoader } from "react-spinners";

type Props = {
  params: {
    token: string;
  };
};

export default function Page({ params }: Props) {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col flex-grow gap-4">
        <Suspense
          fallback={
            <div className="flex flex-col items-center gap-4">
              <p>Validating your link</p>
              <PulseLoader color="white" size={20} />
            </div>
          }
        >
          <ResetPasswordWrapper token={params.token} />
        </Suspense>
      </div>
    </div>
  );
}
