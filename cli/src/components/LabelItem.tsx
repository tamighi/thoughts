import type { ILabel } from "@/types/label";

interface LabelItemProps {
  label: ILabel;
}

const LabelItem = ({ label }: LabelItemProps) => {
  return (
    <div className="border-b border-zinc-800 py-4">
      <h2 className="text-lg font-semibold">{label.content}</h2>

      {label.definition && (
        <p className="mt-1 text-sm text-zinc-400">{label.definition}</p>
      )}
    </div>
  );
};

export default LabelItem;
