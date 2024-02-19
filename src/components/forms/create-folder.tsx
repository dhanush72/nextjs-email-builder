'use client';

import { updateFolder } from '@/lib/queries';
import { useModal } from '@/providers/modal-provider';
import { createFolder } from '@/server/actions/create-folder';
import { CreateFolderFormSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Folder } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface CreateFolderFormProps {
  type: 'create' | 'update';
  data?: Folder;
}

const CreateFolderForm = ({ type, data }: CreateFolderFormProps) => {
  const { setClose } = useModal();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CreateFolderFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(CreateFolderFormSchema),
    defaultValues: {
      name: data?.name || '',
      description: data?.description || '',
    },
  });

  const buttonLabel = type === 'update' ? 'Rename' : 'Create';

  const onSubmit = async (values: z.infer<typeof CreateFolderFormSchema>) => {
    startTransition(async () => {
      if (type === 'create') {
        createFolder(values).then((data) => {
          toast.success('Folder created');
          router.refresh();
          setClose();
        });
      } else if (type === 'update') {
        if (!data) return;

        const response = await updateFolder(data.id, values);
        if (!response) return;
        toast.success('Folder updated');
        router.refresh();
        setClose();
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500">Folder name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Onboarding emails"
                  disabled={pending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500">Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="description"
                  disabled={pending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? (
            <svg
              className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            `${buttonLabel} folder`
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateFolderForm;
