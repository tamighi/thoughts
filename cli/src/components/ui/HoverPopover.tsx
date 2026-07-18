import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface HoverPopoverProps {
  content: ReactNode;
  children: ReactNode;
  className?: string;
}

const HoverPopover = ({ content, children, className }: HoverPopoverProps) => {
  return (
    <span className="group relative inline">
      {children}

      <div
        className={cn(
          "pointer-events-none absolute left-0 z-10 mt-2 hidden",
          "w-max max-w-64",
          "rounded-md border border-zinc-700 bg-zinc-900 p-3",
          "text-sm text-zinc-200 shadow-lg group-hover:block",
          className,
        )}
      >
        {content}
      </div>
    </span>
  );
};

export default HoverPopover;
