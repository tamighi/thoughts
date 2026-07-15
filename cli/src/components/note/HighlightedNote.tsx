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
  content: string;
  highlights: Highlight[];
  selectionEnabled?: boolean;
  onHighlightClick?: (highlight: Highlight) => void;
  onNewHighlight?: (selection: TextSelectionEvent) => void;
}

const HighlightedNote = ({
  content,
  highlights,
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

  const sortedHighlights = highlights.sort((a, b) => a.start - b.start);

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
      {sortedHighlights.map((highlight) => {
        const before = content.slice(cursor, highlight.start);

        const highlightedContent = content.slice(
          highlight.start,
          highlight.start + highlight.length,
        );

        cursor = highlight.start + highlight.length;

        return (
          <span key={highlight.id ?? 0}>
            {before}

            <HoverCard content={highlight.comment}>
              <span
                role={onHighlightClick ? "button" : undefined}
                tabIndex={onHighlightClick ? 0 : undefined}
                className={cn(
                  "cursor-pointer bg-yellow-300/30 hover:bg-yellow-300/50",
                )}
                onClick={(event) => handleHighlightClick(event, highlight)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    window.getSelection()?.removeAllRanges();
                    onHighlightClick?.(highlight);
                  }
                }}
              >
                {highlightedContent}
              </span>
            </HoverCard>
          </span>
        );
      })}

      {content.slice(cursor)}
    </div>
  );
};

export default HighlightedNote;
