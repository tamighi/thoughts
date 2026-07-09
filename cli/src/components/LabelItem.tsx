import { useState } from "react";

import Button from "@/components/Button";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useDeleteLabel } from "@/hooks/query/labels/useDeleteLabel";
import type { ILabel } from "@/types/label";

interface LabelItemProps {
  label: ILabel;
}

const LabelItem = ({ label }: LabelItemProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { mutate: deleteLabel, isPending } = useDeleteLabel();

  const handleDelete = () => {
    deleteLabel(label.id, {
      onSuccess: () => setConfirmOpen(false),
    });
  };

  return (
    <>
      <div className="flex items-start justify-between border-b border-zinc-800 py-4">
        <div>
          <h2 className="text-lg font-semibold">{label.content}</h2>

          {label.definition && (
            <p className="mt-1 text-sm text-zinc-400">{label.definition}</p>
          )}
        </div>

        <Button variant="secondary" onClick={() => setConfirmOpen(true)}>
          Delete
        </Button>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete label"
        isLoading={isPending}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      >
        Are you sure you want to delete <strong>{label.content}</strong>?
      </ConfirmDialog>
    </>
  );
};

export default LabelItem;
