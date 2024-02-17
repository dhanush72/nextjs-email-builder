'use server';

import { signIn } from '@/app/api/auth/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/config/routes';
import { SignInFormSchema } from '@/types';
import { AuthError } from 'next-auth';
import z from 'zod';

export const login = async (values: z.infer<typeof SignInFormSchema>) => {
  const validateFields = SignInFormSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      status: 400,
      message: 'Invalid fields',
    };
  }

  const { email, password } = validateFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            status: 400,
            message: 'Invalid login credentials',
          };

        default:
          return {
            status: 500,
            message: 'Something went wrong!',
          };
      }
    }

    throw error;
  }
};
