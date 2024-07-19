"use client";
import { ResetAction } from "@/actions/auth";
import { ResetSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
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

export default function ResetForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm({
    resolver: zodResolver(ResetSchema),
    defaultValues: { email: "" },
  });

  async function handleSubmit(values: z.infer<typeof ResetSchema>) {
    setError("");
    setSuccess("");

    const action = await ResetAction(values);

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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email"
                      disabled={form.formState.isSubmitting}
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
                ? "Resetting Password"
                : "Reset Password"}
            </Button>
          </form>
        </div>
      </Form>
      <div className="flex flex-col items-center">
        <Button
          variant={"link"}
          size={"lg"}
          className="px-0 w-fit"
          asChild
        >
          <Link href="/login">&larr; Back to login</Link>
        </Button>
      </div>
    </div>
  );
}
