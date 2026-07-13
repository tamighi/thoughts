import { useEffect, useState } from "react";
import type { Note } from "@/types/note";
import type { Highlight } from "@/types/highlight";
import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import Textarea from "@/components/ui/Textarea";
import { cn } from "@/utils/cn";

export type HighlightSelection = {
  start: number;
  length: number;
};

export type SaveHighlightData = {
  start: number;
  length: number;
  comment?: string;
};

interface HighlightDialogProps {
  open: boolean;
  note: Note;
  selection?: HighlightSelection;
  highlight?: Highlight;
  isSaving?: boolean;
  onClose: () => void;
  onSave: (data: SaveHighlightData) => void | Promise<void>;
}

const HighlightDialog = ({
  open,
  note,
  selection,
  highlight,
  isSaving = false,
  onClose,
  onSave,
}: HighlightDialogProps) => {
  const [comment, setComment] = useState("");

  const start = highlight?.start ?? selection?.start ?? 0;
  const length = highlight?.length ?? selection?.length ?? 0;

  useEffect(() => {
    if (!open) return;

    setComment(highlight?.comment ?? "");
  }, [open, highlight]);

  const before = note.content.slice(0, start);

  const highlightedContent = note.content.slice(start, start + length);

  const after = note.content.slice(start + length);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onSave({
      start,
      length,
      comment: comment.trim() || undefined,
    });
  };

  return (
    <Dialog
      open={open}
      title={highlight ? "Edit highlight" : "Create highlight"}
      onClose={onClose}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <h3 className="mb-2 text-sm font-medium">Highlighted content</h3>

          <div
            className={cn(
              "max-h-64 overflow-y-auto whitespace-break-spaces",
              "rounded-md border border-secondary-border",
              "bg-secondary p-3 text-sm text-secondary-foreground",
            )}
          >
            {before}

            <mark className="rounded bg-yellow-300/30 px-0.5 text-inherit">
              {highlightedContent}
            </mark>

            {after}
          </div>
        </div>

        <div>
          <label
            htmlFor="highlight-comment"
            className="mb-2 block text-sm font-medium"
          >
            Comment
          </label>

          <Textarea
            id="highlight-comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Add a comment..."
            rows={4}
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            disabled={isSaving}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isSaving || length === 0}>
            {isSaving
              ? "Saving..."
              : highlight
                ? "Save changes"
                : "Create highlight"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default HighlightDialog;
