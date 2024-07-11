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

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function handleSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <div className="w-1/4 p-6">
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
                  <Input placeholder="email" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant={"default"} className="">
            Login
          </Button>
          <div>
            <Link
              href="/sign-up"
              className="underline underline-offset-2 text-center flex justify-center"
            >
              Don&apos;t Have an Account?
            </Link>
          </div>
        </form>
      </div>
    </Form>
  );
}
