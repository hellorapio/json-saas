import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must not be empty").trim(),
  email: z.string().email("Invalid Email Format").trim().toLowerCase(),
  password: z.string().min(6, "Password is not strong enough"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid Email Format").trim().toLowerCase(),
  password: z.string().min(3, "Invalid Password"),
});

export const ResetSchema = z.object({
  email: z.string().email("Invalid Email Format").trim().toLowerCase(),
});
