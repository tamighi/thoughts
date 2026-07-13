import type { Label } from "@/types/label";
import HoverCard from "@/components/ui/HoverCard";
import { cn } from "@/utils/cn";

interface LabelChipProps {
  label: Label;
  className?: string;
}

const LabelChip = ({ label, className }: LabelChipProps) => {
  return (
    <span className={cn("group relative inline-block", className)}>
      <HoverCard content={label.definition}>
        <span
          className={cn(
            "inline-flex items-center rounded-full",
            "bg-zinc-800 px-3 py-1",
            "text-sm text-zinc-100",
          )}
        >
          {label.content}
        </span>
      </HoverCard>
    </span>
  );
};

export default LabelChip;
