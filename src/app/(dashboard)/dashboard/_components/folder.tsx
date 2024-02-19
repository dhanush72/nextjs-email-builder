'use client';

import CreateFolderForm from '@/components/forms/create-folder';
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
import { deleteFolder } from '@/lib/queries';
import { useModal } from '@/providers/modal-provider';
import { Folder } from '@prisma/client';
import { MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface FolderProps {
  folder: Folder;
}

const FolderItem = ({ folder }: FolderProps) => {
  const router = useRouter();
  const { setOpen } = useModal();

  const handleFolderRename = () => {
    setOpen(
      <CustomModal title="Rename folder">
        <CreateFolderForm type="update" data={folder} />
      </CustomModal>,
    );
  };

  const handleDeleteFolder = async (folder: Folder) => {
    try {
      const response = await deleteFolder(folder.id);
      toast.success(`${response?.name} - Deleted`);
      router.refresh();
    } catch (error) {
      toast.error('Failed to delete folder');
    }
  };

  const handleOpenEmail = (folderId: string) => {
    router.push(`/dashboard/folder/${folderId}`);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="relative overflow-hidden rounded-lg bg-gray-50 transition-all">
        <div className="h-[150px]"></div>
      </div>

      <div className="flex items-center justify-between">
        <div
          className="flex cursor-pointer flex-col"
          onClick={() => handleOpenEmail(folder.id)}
        >
          <h3 className="whitespace-nowrap text-sm">{folder.name}</h3>
          <p className="text-xs text-muted-foreground">
            Updated {folder.updatedAt.toLocaleDateString()}
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
                <DropdownMenuItem onClick={() => handleFolderRename()}>
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
                onClick={() => handleDeleteFolder(folder)}
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

export default FolderItem;
