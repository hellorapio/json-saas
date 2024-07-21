"use client";

import { loginSchema } from "@/lib/zod";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { loginAction } from "@/actions/auth";
import OAuth from "./OAuth";
import { Suspense, useState } from "react";
import LoginParamError from "./LoginParamError";
import CommonError from "./CommonError";

export default function LoginForm() {
  const [error, setError] = useState("");
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function handleSubmit(values: z.infer<typeof loginSchema>) {
    setError("");
    const err = (await loginAction(values))?.error;
    if (err) {
      setError(err);
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Password</FormLabel>
                    <Button
                      variant="link"
                      size={"sm"}
                      className="p-0 m-0"
                      asChild
                    >
                      <Link href="/reset">Forgot password?</Link>
                    </Button>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="password"
                      type="password"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Suspense>
              <LoginParamError />
            </Suspense>
            {error && <CommonError message={error}></CommonError>}

            <Button
              type="submit"
              variant={"default"}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Logging in" : "Login"}
            </Button>
          </form>
        </div>
      </Form>
      <div className="flex flex-col gap-4">
        <OAuth />
        <div>
          <Link
            href="/sign-up"
            className="underline underline-offset-2 text-center flex justify-center"
          >
            Don&apos;t Have an Account?
          </Link>
        </div>
      </div>
    </div>
  );
}
