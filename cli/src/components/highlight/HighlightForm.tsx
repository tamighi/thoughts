import type { Highlight } from "@/types/highlight";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import LabelMultiSelect from "@/components/label/LabelMultiSelect";
import React from "react";
import { useCreateHighlight } from "@/hooks/query/highlights/useCreateHighlight";
import { useUpdateHighlight } from "@/hooks/query/highlights/useUpdateHighlight";

interface HighlightFormProps {
  highlight: Partial<Highlight>;
}

const HighlightForm = ({ highlight }: HighlightFormProps) => {
  const [comment, setComment] = React.useState("");
  const [labelIds, setLabelIds] = React.useState<number[]>([]);

  const createHighlight = useCreateHighlight();
  const updateHighlight = useUpdateHighlight();

  React.useEffect(() => {
    setComment(highlight.comment ?? "");
    setLabelIds(highlight.labels?.map((label) => label.id) ?? []);
  }, [highlight]);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (highlight.id) {
      updateHighlight.mutate({
        id: highlight.id,
        dto: {
          ...highlight,
          comment: comment.trim(),
          labelIds,
        },
      });
    } else {
      createHighlight.mutate({
        ...(highlight as Highlight),
        comment: comment.trim(),
        labelIds,
      });
    }
  };

  const isSaving = createHighlight.isPending || updateHighlight.isPending;

  return (
    <div className="flex flex-col items-start gap-4 rounded-lg border border-zinc-800 p-4">
      <h1 className="text-xl font-semibold">Highlight form</h1>

      <Textarea
        id="highlight-comment"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Add a comment..."
        rows={2}
        autoFocus
      />

      <LabelMultiSelect value={labelIds} onChange={setLabelIds} />

      <Button className="self-end" onClick={handleSubmit} disabled={isSaving}>
        Save
      </Button>
    </div>
  );
};

export default HighlightForm;
