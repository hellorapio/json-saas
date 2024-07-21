"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import CommonError from "./CommonError";
import Success from "./Success";
import { NewPasswordAction } from "@/actions/auth";
import { NewPasswordSchema } from "@/lib/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = {
  token: string;
};

export default function NewPasswordForm({ token }: Props) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: { password: "", passwordConfirm: "" },
  });

  async function handleSubmit(values: z.infer<typeof NewPasswordSchema>) {
    setError("");
    setSuccess("");

    const action = await NewPasswordAction(values, token);

    if (action.error) {
      setError(action.error);
    } else {
      setSuccess(action.message as string);
    }
  }

  return (
    <div className="flex flex-col w-1/4 gap-6">
      <Form {...form}>
        <div className="w-full">
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-6 "
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      disabled={form.formState.isSubmitting}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Your password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Re-enter your password"
                      disabled={form.formState.isSubmitting}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <CommonError message={error}></CommonError>}
            {success && <Success message={success}></Success>}

            <Button
              type="submit"
              variant={"default"}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Changing Password"
                : "Change Password"}
            </Button>
          </form>
        </div>
      </Form>
    </div>
  );
}
