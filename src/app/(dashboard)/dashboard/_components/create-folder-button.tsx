'use client';

import CreateFolderForm from '@/components/forms/create-folder';
import CustomModal from '@/components/shared/custom-modal';
import { Button } from '@/components/ui/button';
import { useModal } from '@/providers/modal-provider';
import { Plus } from 'lucide-react';

interface CreateFolderButtonProps {
  label: string;
  children?: React.ReactNode;
}

const CreateFolderButton = ({ label }: CreateFolderButtonProps) => {
  const { setOpen } = useModal();
  return (
    <Button
      className="flex items-center gap-x-2"
      onClick={() => {
        setOpen(
          <CustomModal title="Name your folder">
            <CreateFolderForm type="create" />
          </CustomModal>,
        );
      }}
    >
      <Plus size={18} />
      {label}
    </Button>
  );
};

export default CreateFolderButton;
