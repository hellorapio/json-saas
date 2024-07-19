"use server";

import { createToken } from "@/db/repositories/tokens";
import { getUserByEmail } from "@/db/repositories/user";
import { signIn, signOut } from "@/lib/auth";
import { mail } from "@/lib/email";
import { linkBuilder } from "@/lib/utils";
import { loginSchema, ResetSchema } from "@/lib/zod";
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

export const ResetAction = async (values: z.infer<typeof ResetSchema>) => {
  "use server";
  const validated = await ResetSchema.safeParseAsync(values);
  if (!validated.success) return { error: "Data is not valid" };

  const { email } = validated.data;
  const user = await getUserByEmail(email);
  if (!user) return { error: "Email doesn't exist" };

  const token = await createToken(email, "Password-Reset");

  await mail(email, linkBuilder(token, "Password-Reset"));

  return { message: "Reset Link has been sent!" };
};
