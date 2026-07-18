import type { HighlightWithState } from "@/pages/NoteDetailPage";
import HighlightItem from "../highlight/HighlightItem";

type Props = {
  highlights: HighlightWithState[];
};

const NoteHighlights = ({ highlights }: Props) => {
  if (highlights.length === 0) {
    return <p className="text-zinc-400">No highlights.</p>;
  }

  const sortedHighlights = [...highlights].sort((a, b) => a.start - b.start);

  return (
    <div className="flex flex-col gap-4">
      {sortedHighlights.map((highlight) => (
        <HighlightItem
          key={highlight.id}
          highlight={highlight}
          focus={
            highlight.state === "hovering" || highlight.state === "editing"
          }
        />
      ))}
    </div>
  );
};

export default NoteHighlights;
