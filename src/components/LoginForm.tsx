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
import { useToast } from "./ui/use-toast";
import { loginAction } from "@/actions/auth";
import OAuth from "./OAuth";

export default function LoginForm() {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function handleSubmit(values: z.infer<typeof loginSchema>) {
    const err = (await loginAction(values))?.error;
    if (err) {
      toast({
        variant: "destructive",
        title: err,
      });
    } else {
      toast({
        variant: "default",
        title: "Logged In Successfully",
      });
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
                  <FormLabel>Password</FormLabel>
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
