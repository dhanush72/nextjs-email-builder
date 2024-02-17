"use server";

import { db } from "@/lib/db";
import { SignUpFormSchema } from "@/types";
import bcrypt from "bcryptjs";
import z from "zod";
import { getUserByEmail } from "./user";

export const signUp = async (values: z.infer<typeof SignUpFormSchema>) => {
  const validateFields = SignUpFormSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      status: 400,
      message: "Invalid fields",
    };
  }

  const { email, password } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      status: 400,
      message: "A user with this email already exists",
    };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  //TODO: Send verification token email

  return {
    status: 200,
    message: "User created",
  };
};
