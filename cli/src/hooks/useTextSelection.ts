import { useEffect, type RefObject } from "react";

export type TextSelectionEvent = {
  text: string;
  range: Range;
  start: number;
  length: number;
};

type UseTextSelectionOptions = {
  enabled?: boolean;
  onSelect?: (event: TextSelectionEvent) => void;
  onClear?: () => void;
};

function getTextOffset(root: HTMLElement, node: Node, offset: number) {
  let currentOffset = 0;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  let currentNode = walker.nextNode();

  while (currentNode) {
    if (currentNode === node) {
      return currentOffset + offset;
    }

    currentOffset += currentNode.textContent?.length ?? 0;
    currentNode = walker.nextNode();
  }

  return currentOffset;
}

function getAbsoluteRange(root: HTMLElement, range: Range) {
  const start = getTextOffset(root, range.startContainer, range.startOffset);

  const end = getTextOffset(root, range.endContainer, range.endOffset);

  return {
    start: Math.min(start, end),
    end: Math.max(start, end),
  };
}

export const useTextSelection = (
  ref: RefObject<HTMLElement | null>,
  { enabled = true, onSelect, onClear }: UseTextSelectionOptions,
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleSelection = () => {
      const selection = window.getSelection();
      const root = ref.current;

      if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
        onClear?.();
        return;
      }

      if (!root) return;

      const range = selection.getRangeAt(0);

      if (
        !root.contains(range.startContainer) ||
        !root.contains(range.endContainer)
      ) {
        return;
      }

      const { start, end } = getAbsoluteRange(root, range);
      const text = selection.toString();

      if (!text.trim()) {
        onClear?.();
        return;
      }

      onSelect?.({
        text,
        range: range.cloneRange(),
        start,
        length: end - start,
      });
    };

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("keyup", handleSelection);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("keyup", handleSelection);
    };
  }, [ref, enabled, onSelect, onClear]);
};
