import { FC } from "react";
import Select, { SingleValue } from "react-select";
import { getCustomStyles } from "../utils";

type option = { label: string; value: unknown };

type Props = {
  instanceId: string;
  placeholder: string;
  value: SingleValue<option>;
  options: option[];
  onChange: (newValue: unknown) => void;
};

export const MultiSelectInput: FC<Props> = (props) => {
  const { instanceId, placeholder, value, options, onChange } = props;
  return (
    <Select
      instanceId={instanceId}
      placeholder={placeholder}
      value={value}
      options={options}
      onChange={(selectedOption) => {
        onChange(selectedOption?.value);
      }}
      styles={getCustomStyles()}
    />
  );
};
