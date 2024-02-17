"use server";

import { SignInFormSchema } from "@/types";
import z from "zod";

export const signIn = async (values: z.infer<typeof SignInFormSchema>) => {
  const validateFields = SignInFormSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      status: 400,
      message: "Invalid fields",
    };
  }

  return {
    status: 200,
    message: "Sign in success",
  };
};
