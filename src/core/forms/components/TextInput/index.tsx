import { TextField } from "@mui/material";
import clsx from "clsx";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  className?: string;
};

export const TextInput: FC<Props> = (props) => {
  const { name, label, className } = props;
  const { control } = useFormContext();

  return (
    <div className={clsx(className)}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextField
              label={label}
              variant="outlined"
              onChange={(event) => onChange(event.currentTarget.value)}
              value={value || ""}
              size="small"
              required={true}
              error={!!error}
              fullWidth={true}
            />
          );
        }}
      />
    </div>
  );
};
