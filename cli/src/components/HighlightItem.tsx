import LabelChip from "@/components/LabelChip";
import type { Highlight } from "@/types/highlight";

type Props = {
  highlight: Highlight;
};

const HighlightItem = ({ highlight }: Props) => {
  return (
    <div className="rounded-lg border border-zinc-800 p-4">
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
  );
};

export default HighlightItem;
