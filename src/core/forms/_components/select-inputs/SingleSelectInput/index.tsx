import { FC } from "react";
import Select, { SingleValue } from "react-select";
import { getCustomStyles } from "../utils";
import clsx from "clsx";

type Option = { label: string; value: unknown };

type Props = {
  instanceId: string;
  placeholder: string;
  value: SingleValue<Option>;
  options: Option[];
  onChange: (newValue: unknown) => void;
  onInputChange?: (input: string) => void;
  className?: string;
};

export const SingleSelectInput: FC<Props> = (props) => {
  const {
    instanceId,
    placeholder,
    value,
    options,
    onChange,
    onInputChange,
    className,
  } = props;
  return (
    <Select
      className={clsx(className)}
      instanceId={instanceId}
      placeholder={placeholder}
      value={value}
      options={options}
      onChange={(selectedOption) => onChange(selectedOption)}
      onInputChange={onInputChange}
      styles={getCustomStyles()}
    />
  );
};
