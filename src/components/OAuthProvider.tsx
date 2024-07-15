import { Button } from "./ui/button";

export default function OAuthProvider({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      variant="default"
      size="lg"
      className="w-full flex gap-3 items-center"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
