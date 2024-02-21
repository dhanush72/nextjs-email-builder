'use server';

import { CreateFolderFormSchema, UpsertEmail } from '@/types';
import { z } from 'zod';
import { db } from './db';

export const createFolder = async (
  values: z.infer<typeof CreateFolderFormSchema>,
  userId: string,
) => {
  const validateFields = CreateFolderFormSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      status: 400,
      message: 'Invalid fields',
    };
  }

  const { name, description } = validateFields.data;

  const response = await db.folder.create({
    data: {
      name,
      description: description,
      userId: userId,
    },
  });

  return response;
};

export const updateFolder = async (
  folderId: string,
  values: z.infer<typeof CreateFolderFormSchema>,
) => {
  try {
    const response = await db.folder.update({
      where: { id: folderId },
      data: {
        ...values,
      },
    });
    return response;
  } catch (error) {}
};

export const getFolders = async (userId: string) => {
  try {
    const response = await db.folder.findMany({
      where: {
        userId,
      },
      include: {
        emails: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return response;
  } catch (error) {
    console.log('getFolders error', error);
  }
};

export const deleteFolder = async (id: string) => {
  try {
    const response = await db.folder.delete({
      where: {
        id,
      },
    });
    return response;
  } catch (error) {
    console.log('deleteFolder error', error);
  }
};

export const upsertEmail = async (folderId: string, email: UpsertEmail) => {
  try {
    const response = await db.email.upsert({
      where: {
        id: email.id || '',
      },
      update: { ...email },
      create: {
        ...email,
        content: email.content
          ? email.content
          : JSON.stringify([
              {
                content: [],
                id: '__body',
                name: 'Body',
                styles: { backgroundColor: 'white' },
                type: '__body',
              },
            ]),
        folderId,
      },
    });
    console.log('response', response);
    return response;
  } catch (error) {
    console.log('createEmail error', error);
  }
};

export const createEmail = async (folderId: string, email: UpsertEmail) => {
  try {
    const response = await db.email.create({
      data: {
        ...email,
        content: JSON.stringify([
          {
            content: [],
            id: '__body',
            name: 'Body',
            styles: { backgroundColor: 'white' },
            type: '__body',
          },
        ]),
        folderId,
      },
    });
    return response;
  } catch (error) {
    console.log('createEmail error', error);
  }
};

export const updateEmail = async (
  emailId: string,
  folderId: string,
  values: UpsertEmail,
) => {
  try {
    const response = await db.email.update({
      where: { id: emailId },
      data: {
        ...values,
        folderId,
      },
    });
    return response;
  } catch (error) {}
};

export const deleteEmail = async (id: string) => {
  try {
    const response = await db.email.delete({
      where: {
        id,
      },
    });
    return response;
  } catch (error) {
    console.log('deleteFolder error', error);
  }
};

export const getEmailsByFolderId = async (folderId: string) => {
  try {
    const response = await db.email.findMany({
      where: {
        folderId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return response;
  } catch (error) {
    console.log('getEmails error', error);
  }
};
