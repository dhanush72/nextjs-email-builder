import { Prisma } from '@prisma/client';
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

export const CreateFolderFormSchema = z.object({
  name: z.string().min(1, { message: 'Folder name is required' }),
  description: z.string().optional(),
});

export const CreateEmailFormSchema = z.object({
  name: z.string().min(1, { message: 'Email name is required' }),
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

export interface BreadcrumbType {
  title: string;
  link: string;
}

export type UpsertEmail = Prisma.EmailCreateWithoutFolderInput;
