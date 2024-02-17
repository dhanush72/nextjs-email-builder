"use server";

import { db } from "@/lib/db";
import { SignInFormSchema } from "@/types";
import bcrypt from "bcryptjs";
import z from "zod";
import { getUserByEmail } from "./user";

export const signIn = async (values: z.infer<typeof SignInFormSchema>) => {
  const validateFields = SignInFormSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      status: 400,
      message: "Invalid fields",
    };
  }

  const { email, password } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      status: 400,
      message: "Invalid login credentials",
    };
  }

  return {
    status: 200,
    message: "Sign in success",
  };
};
