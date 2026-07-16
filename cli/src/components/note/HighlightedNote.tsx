import {
  useTextSelection,
  type TextSelectionEvent,
} from "@/hooks/useTextSelection";
import type { Highlight } from "@/types/highlight";
import { cn } from "@/utils/cn";
import {
  useCallback,
  useMemo,
  useRef,
  type HTMLAttributes,
  type MouseEvent,
} from "react";
import HoverCard from "../ui/HoverCard";

export type HighlightWithColor = Highlight & {
  color?: string;
};

interface HighlightedNoteProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  highlights: HighlightWithColor[];
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

  const sortedHighlights = useMemo(
    () => [...highlights].sort((a, b) => a.start - b.start),
    [highlights],
  );

  const handleSelection = useCallback(
    (selection: TextSelectionEvent) => {
      const selectionStart = selection.start;
      const selectionEnd = selection.start + selection.length;

      const overlapsExistingHighlight = highlights.some((highlight) => {
        const highlightStart = highlight.start;
        const highlightEnd = highlight.start + highlight.length;

        return selectionStart < highlightEnd && selectionEnd > highlightStart;
      });

      if (overlapsExistingHighlight) {
        window.getSelection()?.removeAllRanges();
        return;
      }

      onNewHighlight?.(selection);
    },
    [highlights, onNewHighlight],
  );

  useTextSelection(contentRef, {
    enabled: selectionEnabled && Boolean(onNewHighlight),
    onSelect: handleSelection,
  });

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
          <span key={highlight.start}>
            {before}

            <HoverCard content={highlight.comment}>
              <span
                className="cursor-pointer"
                style={{
                  backgroundColor: highlight.color ?? "rgb(253 224 71 / 0.3)",
                }}
                onClick={(event) => handleHighlightClick(event, highlight)}
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
