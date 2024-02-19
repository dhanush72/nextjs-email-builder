import { auth } from '@/app/api/auth/auth';

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user.role;
};
