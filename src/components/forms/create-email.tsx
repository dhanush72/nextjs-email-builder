'use client';

import { createEmail, updateEmail, upsertEmail } from '@/lib/queries';
import { useModal } from '@/providers/modal-provider';
import { CreateEmailFormSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Email } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 } from 'uuid';
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

interface CreateEmailFormProps {
  folderId: string;
  type: 'create' | 'update';
  data?: Email;
}

const CreateEmailForm = ({
  folderId,
  type = 'create',
  data,
}: CreateEmailFormProps) => {
  const { setClose } = useModal();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CreateEmailFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(CreateEmailFormSchema),
    defaultValues: {
      name: data?.name || '',
    },
  });

  const buttonLabel = type === 'update' ? 'Rename' : 'Create';

  const onSubmit = async (values: z.infer<typeof CreateEmailFormSchema>) => {
    startTransition(async () => {
      if (type === 'create') {
        try {
          const response = await createEmail(folderId, {
            ...values,
            order: 0,
            pathName: '',
          });
          toast.success(`${response?.name} - Email created`);
          setClose();
          router.refresh();
        } catch (error) {
          toast.error('Failed to create email');
        }
      } else {
        if (!data) return;
        try {
          const response = await updateEmail(data?.id, folderId, {
            ...values,
            order: 0,
            pathName: '',
          });
          toast.success(`Email updated`);
          setClose();
          router.refresh();
        } catch (error) {
          toast.error('Failed to update');
        }
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
              <FormLabel className="text-gray-500">Email name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="name" disabled={pending} />
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

export default CreateEmailForm;
