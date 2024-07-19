import { BiSolidError } from "react-icons/bi";

export default function CommonError({ message }: { message: string }) {
  return (
    <div className="text-destructive-foreground text-md bg-destructive p-4 rounded-lg flex items-center gap-2">
      <BiSolidError className="w-6 h-6" />
      <span>{message}</span>
    </div>
  );
}
