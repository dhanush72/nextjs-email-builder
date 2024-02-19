import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/providers/modal-provider';

interface CustomModalProps {
  title: string;
  subheading?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const CustomModal = ({
  title,
  subheading,
  defaultOpen,
  children,
}: CustomModalProps) => {
  const { isOpen, setClose } = useModal();
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">{title}</DialogTitle>
          <DialogDescription>{subheading}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
