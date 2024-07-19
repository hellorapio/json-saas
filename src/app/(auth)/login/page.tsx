import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login to our app",
};

export default function Page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col flex-grow gap-4">
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <div className="flex justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
