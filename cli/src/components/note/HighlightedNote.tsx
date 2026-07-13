import type { Note } from "@/types/note";
import type { Highlight } from "@/types/highlight";
import {
  useCallback,
  useRef,
  type HTMLAttributes,
  type MouseEvent,
} from "react";
import HoverCard from "../ui/HoverCard";
import { cn } from "@/utils/cn";
import {
  useTextSelection,
  type TextSelectionEvent,
} from "@/hooks/useTextSelection";

interface HighlightedNoteProps extends HTMLAttributes<HTMLDivElement> {
  note: Note;
  selectionEnabled?: boolean;
  onHighlightClick?: (highlight: Highlight) => void;
  onNewHighlight?: (selection: TextSelectionEvent) => void;
}

const HighlightedNote = ({
  note,
  className,
  selectionEnabled = true,
  onHighlightClick,
  onNewHighlight,
  ...props
}: HighlightedNoteProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSelection = useCallback(
    (selection: TextSelectionEvent) => {
      onNewHighlight?.(selection);
    },
    [onNewHighlight],
  );

  useTextSelection(contentRef, {
    enabled: selectionEnabled && Boolean(onNewHighlight),
    onSelect: handleSelection,
  });

  const highlights = [...(note.highlights ?? [])].sort(
    (a, b) => a.start - b.start,
  );

  const handleHighlightClick = (
    event: MouseEvent<HTMLSpanElement>,
    highlight: Highlight,
  ) => {
    event.stopPropagation();
    window.getSelection()?.removeAllRanges();
    onHighlightClick?.(highlight);
  };

  let cursor = 0;

  return (
    <div
      ref={contentRef}
      className={cn("whitespace-break-spaces", className)}
      {...props}
    >
      {highlights.map((highlight) => {
        const before = note.content.slice(cursor, highlight.start);

        const highlightedContent = note.content.slice(
          highlight.start,
          highlight.start + highlight.length,
        );

        cursor = highlight.start + highlight.length;

        return (
          <span key={highlight.id}>
            {before}

            <HoverCard content={highlight.comment}>
              <span
                role={onHighlightClick ? "button" : undefined}
                tabIndex={onHighlightClick ? 0 : undefined}
                className={cn(
                  "rounded bg-yellow-300/30 p-0.5",
                  onHighlightClick && "cursor-pointer hover:bg-yellow-300/50",
                )}
                onClick={(event) => handleHighlightClick(event, highlight)}
                onKeyDown={(event) => {
                  if (
                    onHighlightClick &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    window.getSelection()?.removeAllRanges();
                    onHighlightClick(highlight);
                  }
                }}
              >
                {highlightedContent}
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
