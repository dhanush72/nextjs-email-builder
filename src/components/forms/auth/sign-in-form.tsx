"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const SignInForm = () => {
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    mode: "onBlur",
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignInFormSchema>) => {
    toast.success("Login success");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800">Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="you@example.com" />
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
              <FormLabel className="text-gray-800">Password</FormLabel>
              <FormControl className="relative">
                <Input {...field} type="password" placeholder="••••••••" />
              </FormControl>
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-xs text-right text-muted-foreground"
                >
                  Forgot Password?
                </Link>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Sign In
        </Button>
        <div className="flex items-center justify-center text-sm gap-1">
          <span className="text-xs text-muted-foreground">
            Don&apos;t have an account?
          </span>
          <Link href="/sign-up" className="text-foreground">
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
