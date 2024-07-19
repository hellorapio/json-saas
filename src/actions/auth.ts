"use server";

import { signIn, signOut } from "@/lib/auth";
import { loginSchema } from "@/lib/zod";
import { redirection } from "@/routes";
import { AuthError } from "next-auth";
import { z } from "zod";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  const validated = await loginSchema.safeParseAsync(values);
  if (!validated.success) return { error: "Invalid Fields" };

  const { email, password } = validated.data;

  try {
    await signIn("credentials", {
      redirect: true,
      redirectTo: redirection,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Incorrect email or password" };
        case "CallbackRouteError":
          return { error: "Something went Wrong!" };
        default:
          return { error: "Something went Wrong!" };
      }
    }

    throw error;
  }
};

export const signOutAction = async () => {
  "use server";
  await signOut();
};
