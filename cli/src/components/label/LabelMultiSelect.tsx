import { useLabels } from "@/hooks/query/labels/useLabels";
import MultiSelect from "@/components/ui/MultiSelect";

interface LabelMultiSelectProps {
  value: number[];
  onChange: (labelIds: number[]) => void;
  disabled?: boolean;
}

const LabelMultiSelect = ({
  value,
  onChange,
  disabled = false,
}: LabelMultiSelectProps) => {
  const { data: labels = [], isLoading } = useLabels();

  return (
    <MultiSelect
      options={labels}
      value={value}
      onChange={onChange}
      valueKey="id"
      labelKey="content"
      placeholder={isLoading ? "Loading labels..." : "No labels available"}
      disabled={disabled || isLoading}
    />
  );
};

export default LabelMultiSelect;
