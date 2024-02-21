'use client';

import { createEmail, updateEmail, upsertEmail } from '@/lib/queries';
import { useModal } from '@/providers/modal-provider';
import { CreateEmailFormSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Email } from '@prisma/client';
import { Loader2 } from 'lucide-react';
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

const CreateEmailForm = ({ folderId, type, data }: CreateEmailFormProps) => {
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
                <Input
                  {...field}
                  placeholder="Template name"
                  disabled={pending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-x-2">
          <Button variant="outline" type="button" onClick={() => setClose()}>
            Cancel
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? (
              <Loader2
                size={16}
                className="animate-spin text-muted-foreground"
              />
            ) : (
              `${buttonLabel} folder`
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateEmailForm;
