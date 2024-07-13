import signUp from "@/services/signUp";
import { useMutation } from "@tanstack/react-query";

export function useSignup() {
  const { mutateAsync: signup } = useMutation({
    mutationFn: (body: object) => signUp(body),
  });

  return { signup };
}
