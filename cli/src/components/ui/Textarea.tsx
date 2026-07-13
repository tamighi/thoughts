import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({ className, ...props }: TextareaProps) => {
  return (
    <textarea
      className={cn(
        "w-full rounded-md border",
        "border-secondary-border",
        "bg-secondary",
        "px-3 py-2",
        "text-secondary-foreground",
        "placeholder:text-zinc-500",
        "outline-none transition-colors",
        "focus:border-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};

export default Textarea;
