import React from "react";

type MultiSelectProps<
  T,
  TValueKey extends keyof T,
  TLabelKey extends keyof T,
> = {
  options: T[];
  value: T[TValueKey][];
  onChange: (value: T[TValueKey][]) => void;

  valueKey: TValueKey;
  labelKey: TLabelKey;

  placeholder?: string;
  disabled?: boolean;
};

const MultiSelect = <T, TValueKey extends keyof T, TLabelKey extends keyof T>({
  options,
  value,
  onChange,
  valueKey,
  labelKey,
  placeholder = "Select...",
  disabled = false,
}: MultiSelectProps<T, TValueKey, TLabelKey>) => {
  const selected = React.useMemo(() => new Set(value), [value]);

  const toggle = (option: T) => {
    const optionValue = option[valueKey];

    if (selected.has(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {options.length === 0 && (
        <div className="text-sm text-muted-foreground">{placeholder}</div>
      )}

      {options.map((option) => {
        const optionValue = option[valueKey];
        const checked = selected.has(optionValue);

        return (
          <label
            key={String(optionValue)}
            className="flex cursor-pointer items-center gap-2"
          >
            <input
              type="checkbox"
              checked={checked}
              disabled={disabled}
              onChange={() => toggle(option)}
            />

            <span>{String(option[labelKey])}</span>
          </label>
        );
      })}
    </div>
  );
};

export default MultiSelect;
