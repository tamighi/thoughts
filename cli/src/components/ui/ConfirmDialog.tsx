import Dialog from "./Dialog";
import Button from "./Button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  open,
  title,
  children,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} title={title} onClose={onCancel}>
      <div className="flex flex-col gap-6">
        <div>{children}</div>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>

          <Button onClick={onConfirm} disabled={isLoading}>
            Confirm
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
