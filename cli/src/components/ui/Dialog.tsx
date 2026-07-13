import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import Button from "./Button";

export type DialogProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose?: () => void;
};

const Dialog = ({ open, title, children, onClose }: DialogProps) => {
  if (!open) return null;

  return (
    <div
      className={cn([
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-black/50",
      ])}
      onClick={onClose}
    >
      <div
        className={cn([
          "w-full max-w-lg rounded-lg",
          "border border-zinc-700 bg-zinc-900",
          "text-zinc-100 shadow-xl",
        ])}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={cn([
            "flex items-center justify-between",
            "border-b border-zinc-700",
            "px-4 py-3",
          ])}
        >
          <h2 className="text-lg font-semibold">{title}</h2>

          <Button onClick={onClose}>✕</Button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
