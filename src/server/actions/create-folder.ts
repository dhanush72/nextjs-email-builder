'use server';

import { auth } from '@/app/api/auth/auth';
import { db } from '@/lib/db';
import { CreateFolderFormSchema } from '@/types';
import { z } from 'zod';

export const createFolder = async (
  values: z.infer<typeof CreateFolderFormSchema>,
) => {
  const authUser = await auth();

  if (!authUser || !authUser.user.id) return;

  const validateFields = CreateFolderFormSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      status: 400,
      message: 'Invalid fields',
    };
  }

  const { name, description } = validateFields.data;

  await db.folder.create({
    data: {
      name,
      description: description,
      userId: authUser?.user.id,
    },
  });

  return {
    status: 200,
    message: 'Folder created',
  };
};
