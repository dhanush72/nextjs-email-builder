'use client';

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
import { deleteFolder } from '@/lib/queries';
import { useModal } from '@/providers/modal-provider';
import { Folder } from '@prisma/client';
import { Pencil, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CreateFolderForm from '../forms/create-folder';
import CustomModal from '../shared/custom-modal';
import { Button } from '../ui/button';

interface CellActionProps {
  folder: Folder;
}

const CellAction = ({ folder }: CellActionProps) => {
  const router = useRouter();
  const { setOpen } = useModal();

  const handleFolderRename = () => {
    setOpen(
      <CustomModal title="Rename folder">
        <CreateFolderForm type="update" data={folder} />
      </CustomModal>,
    );
  };

  const handleDeleteFolder = async () => {
    try {
      const response = await deleteFolder(folder.id);
      toast.success(`${response?.name} - Deleted`);
      router.refresh();
    } catch (error) {
      toast.error('Failed to delete folder');
    }
  };
  return (
    <div className="flex items-center">
      <Button variant="ghost" size="icon" onClick={handleFolderRename}>
        <Pencil size={16} className="text-muted-foreground" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Trash size={16} className="text-muted-foreground" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to proceed?
              This will permanently delete all emails stored under this folder.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-center">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive"
              onClick={handleDeleteFolder}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CellAction;
