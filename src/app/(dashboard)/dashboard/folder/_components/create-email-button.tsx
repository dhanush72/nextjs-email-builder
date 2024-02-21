'use client';

import CreateEmailForm from '@/components/forms/create-email';
import CustomModal from '@/components/shared/custom-modal';
import { Button } from '@/components/ui/button';
import { useModal } from '@/providers/modal-provider';
import { Plus } from 'lucide-react';

interface CreateEmailButtonProps {
  label: string;
  folderId?: string;
}

const CreateEmailButton = ({ label, folderId }: CreateEmailButtonProps) => {
  const { setOpen } = useModal();
  if (!folderId) return;
  return (
    <Button
      className="flex items-center gap-x-2"
      onClick={() => {
        setOpen(
          <CustomModal title="Name your email template">
            <CreateEmailForm folderId={folderId} type="create" />
          </CustomModal>,
        );
      }}
    >
      <Plus size={18} />
      {label}
    </Button>
  );
};

export default CreateEmailButton;
