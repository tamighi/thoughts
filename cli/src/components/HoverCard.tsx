import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
}

const HoverCard = ({ children, className }: HoverCardProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 top-full z-10 mt-2 hidden",
        "w-64 rounded-md border border-zinc-700 bg-zinc-900 p-3",
        "text-sm text-zinc-200 shadow-lg group-hover:block",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default HoverCard;
