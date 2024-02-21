'use client';

import { updateFolder } from '@/lib/queries';
import { useModal } from '@/providers/modal-provider';
import { createFolder } from '@/server/actions/create-folder';
import { CreateFolderFormSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Folder } from '@prisma/client';
import { Loader2 } from 'lucide-react';
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

export default CreateFolderForm;
