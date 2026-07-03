import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary:
    "border border-secondary-border bg-secondary text-secondary-foreground hover:bg-secondary-hover",
  danger: "bg-danger text-danger-foreground hover:bg-danger-hover",
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: keyof typeof variants;
};

const Button = ({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn([
        "rounded-md px-4 py-2 text-sm font-medium transition-colors",
        "cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className,
      ])}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
