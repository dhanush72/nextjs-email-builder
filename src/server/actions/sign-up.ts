"use server";

import { SignUpFormSchema } from "@/types";
import z from "zod";

export const signUp = async (values: z.infer<typeof SignUpFormSchema>) => {
  const validateFields = SignUpFormSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      status: 400,
      message: "Invalid fields",
    };
  }

  return {
    status: 200,
    message: "Sign up success",
  };
};
