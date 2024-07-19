import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function Success({ message }: { message: string }) {
  return (
    <div className="text-background bg-foreground text-md p-4 rounded-lg flex items-center gap-2">
      <IoMdCheckmarkCircleOutline className="w-6 h-6 " />
      <span>{message}</span>
    </div>
  );
}
