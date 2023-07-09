import { FC } from "react";
import Select from "react-select";
import { getCustomStyles } from "../utils";

type Option = { label: string; value: unknown };

type Props = {
  instanceId: string;
  placeholder: string;
  value: unknown[];
  options: Option[];
  onChange: (newValue: unknown) => void;
};

export const MultiSelectInput: FC<Props> = (props) => {
  const { instanceId, placeholder, value, options, onChange } = props;
  return (
    <Select
      instanceId={instanceId}
      placeholder={placeholder}
      value={options.filter((option) => value?.includes(option.value))}
      options={options}
      isMulti={true}
      onChange={(selectedOptions) => {
        const newValue = selectedOptions?.map(
          (selectedOption) => selectedOption.value
        );
        onChange(newValue || []);
      }}
      styles={getCustomStyles()}
    />
  );
};
