'use client';

import CreateEmailForm from '@/components/forms/create-email';
import CustomModal from '@/components/shared/custom-modal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteEmail } from '@/lib/queries';
import { useModal } from '@/providers/modal-provider';
import { Email } from '@prisma/client';
import { MoreVertical } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface EmailCardProps {
  folderId: string;
  email: Email;
}

const EmailCard = ({ email, folderId }: EmailCardProps) => {
  const { setOpen } = useModal();
  const router = useRouter();

  const handleEmailRename = () => {
    setOpen(
      <CustomModal title="Rename email">
        <CreateEmailForm folderId={folderId} type="update" data={email} />
      </CustomModal>,
    );
  };

  const handleDeleteEmail = async (email: Email) => {
    try {
      const response = await deleteEmail(email.id);
      toast.success(`${response?.name} - Deleted`);
      router.refresh();
    } catch (error) {
      toast.error('Failed to delete folder');
    }
  };

  const handleOpenEmailEditor = (emailId: string) => {
    redirect(`/dashboard/folder/${folderId}/editor/${emailId}`);
  };
  return (
    <div className="flex cursor-pointer flex-col space-y-2">
      <div className="relative overflow-hidden rounded-lg bg-gray-50 transition-all">
        <div className="h-[150px]"></div>
      </div>

      <div className="flex items-center justify-between">
        <div
          className="flex flex-col"
          onClick={() => handleOpenEmailEditor(email.id)}
        >
          <h3 className="whitespace-nowrap text-sm">{email.name}</h3>
          <p className="text-xs text-muted-foreground">
            Updated {email.updatedAt.toLocaleDateString()}
          </p>
        </div>

        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical
                size={16}
                className="cursor-pointer text-muted-foreground"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36" align="end" forceMount>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handleEmailRename()}>
                  Rename
                </DropdownMenuItem>
                <AlertDialogTrigger className="w-full">
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Are you sure you want to proceed?
                This will permanently delete all emails stored under this
                folder.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex items-center">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive"
                onClick={() => handleDeleteEmail(email)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default EmailCard;
