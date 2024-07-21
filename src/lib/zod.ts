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

export const OTPSchema = z.object({
  code: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), {
      message: "Must be a valid number",
    })
    .refine((val) => Number.isInteger(val), {
      message: "Must be an integer",
    })
    .refine((val) => val >= 100_000 && val < 1_000_000, {
      message: "Must be between 100,000 and 1,000,000",
    }),
});

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, "Password is not strong enough"),
    passwordConfirm: z.string().min(6),
  })
  .refine(
    ({ password, passwordConfirm }) => password === passwordConfirm,
    {
      message: "Passwords must match",
      path: ["passwordConfirm"],
    }
  );
