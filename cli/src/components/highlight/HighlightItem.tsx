import { useState } from "react";
import LabelChip from "@/components/label/LabelChip";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useDeleteHighlight } from "@/hooks/query/highlights/useDeleteHighlight";
import type { Highlight } from "@/types/highlight";
import { cn } from "@/utils/cn";

type Props = {
  highlight: Highlight;
  focus?: boolean;
};

const HighlightItem = ({ highlight, focus }: Props) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deleteHighlight = useDeleteHighlight();

  const handleDelete = () => {
    deleteHighlight.mutate(highlight, {
      onSuccess: () => setConfirmOpen(false),
    });
  };

  return (
    <>
      <div
        className={cn(
          "rounded-lg border p-4 transition-all duration-200",
          focus ? "border-zinc-500 ring-1 ring-zinc-500/30" : "border-zinc-800",
        )}
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            {highlight.comment && (
              <p className="mb-3 whitespace-pre-wrap">{highlight.comment}</p>
            )}

            {highlight.labels && highlight.labels.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {highlight.labels.map((label) => (
                  <LabelChip key={label.id} label={label} />
                ))}
              </div>
            )}
          </div>

          <Button onClick={() => setConfirmOpen(true)}>X</Button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete highlight?"
        isLoading={deleteHighlight.isPending}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      >
        Are you sure you want to delete this highlight?
      </ConfirmDialog>
    </>
  );
};

export default HighlightItem;
