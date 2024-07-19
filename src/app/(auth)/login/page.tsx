import LoginForm from "@/components/auth/LoginForm";
import { Suspense } from "react";

export const metadata = {
  title: "Login to our app",
};

export default function Page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col flex-grow gap-4">
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <div className="flex justify-center">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
