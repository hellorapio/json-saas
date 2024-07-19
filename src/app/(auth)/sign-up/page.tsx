import SignUpForm from "@/components/auth/SignUpForm";
import { PulseLoader } from "react-spinners";

export const metadata = {
  title: "Sign up to our app",
};

export default function Page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col flex-grow gap-4">
        <h1 className="text-2xl font-semibold text-center">Sign up</h1>
        <div className="flex justify-center">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
