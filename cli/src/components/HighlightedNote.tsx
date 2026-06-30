import type { INote } from "@/types/note";
import HoverCard from "./HoverCard";

interface HighlightedNoteProps {
  note: INote;
}

const HighlightedNote = ({ note }: HighlightedNoteProps) => {
  const highlights = [...(note.highlights ?? [])].sort(
    (a, b) => a.start - b.start,
  );

  let cursor = 0;

  return (
    <div className="whitespace-break-spaces">
      {highlights.map((highlight) => {
        const before = note.content.slice(cursor, highlight.start);
        const highlighted = note.content.slice(
          highlight.start,
          highlight.start + highlight.length,
        );

        cursor = highlight.start + highlight.length;

        return (
          <span key={highlight.id}>
            {before}

            <HoverCard content={highlight.comment}>
              <span className="rounded bg-yellow-300/30 p-0.5">
                {highlighted}
              </span>
            </HoverCard>
          </span>
        );
      })}

      {note.content.slice(cursor)}
    </div>
  );
};

export default HighlightedNote;
