import ResetForm from "@/components/auth/ResetForm";

export default function Page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col flex-grow gap-4">
        <h1 className="text-2xl font-semibold text-center">
          Reset your password
        </h1>
        <div className="flex justify-center">
          <ResetForm />
        </div>
      </div>
    </div>
  );
}
