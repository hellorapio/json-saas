import EmailVerification from "@/components/auth/EmailVerification";
import { Suspense } from "react";
import { PulseLoader } from "react-spinners";

export default function Page({ params }: { params: { token: string } }) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-6 flex flex-col items-center gap-6 rounded-xl w-1/4 h-[100px]">
        {/* <h3 className="text-xl">Email Verification</h3> */}
        <Suspense
          fallback={
            <div className="flex flex-col items-center gap-4">
              <p>Verifying your email</p>
              <PulseLoader color="white" size={20} />
            </div>
          }
        >
          <EmailVerification token={params.token} />
        </Suspense>
      </div>
    </div>
  );
}
