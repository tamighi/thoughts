import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
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

export default Input;
