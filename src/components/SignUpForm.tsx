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
import { useSignup } from "@/hooks/auth/sign-up";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

export default function SignUpForm() {
  const { signup } = useSignup();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  async function handleSubmit(values: z.infer<typeof signUpSchema>) {
    try {
      await signup(values);
      toast({
        variant: "default",
        title: "Account created Successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: (error as Error).message,
      });
    }
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
                  <Input
                    placeholder="Full Name"
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
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
                  <Input
                    placeholder="email"
                    {...field}
                    disabled={form.formState.isSubmitting}
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
                    {...field}
                    disabled={form.formState.isSubmitting}
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
            {form.formState.isSubmitting ? "Signing up" : "Sign up"}
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
