import type { Highlight } from "@/types/highlight";
import HighlightItem from "../highlight/HighlightItem";

type Props = {
  highlights: Highlight[];
};

const NoteHighlights = ({ highlights }: Props) => {
  if (highlights.length === 0) {
    return <p className="text-zinc-400">No highlights.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {highlights.map((highlight) => (
        <HighlightItem key={highlight.id} highlight={highlight} />
      ))}
    </div>
  );
};

export default NoteHighlights;
