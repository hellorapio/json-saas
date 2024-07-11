"use client";

import { signUpSchema } from "@/lib/zod";
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

export default function SignUpForm() {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  async function handleSubmit(values: z.infer<typeof signUpSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <div className="w-1/4 p-6">
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            Signup
          </Button>
          <div>
            <Link
              href="/login"
              className="underline underline-offset-2 text-center flex justify-center"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </Form>
  );
}
