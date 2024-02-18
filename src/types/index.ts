import z from 'zod';

export const SignInFormSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const SignUpFormSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 8 characters' }),
});

export const ForgotPasswordFormSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
});

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: string;
  label?: string;
  description?: string;
}
