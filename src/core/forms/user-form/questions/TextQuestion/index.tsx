import { TextField } from "@mui/material";
import clsx from "clsx";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { UserForm } from "../../types";

type Props = {
  name: keyof UserForm;
  label: string;
  className?: string;
};

export const TextQuestion: FC<Props> = (props) => {
  const { name, label, className } = props;
  const { control } = useFormContext<UserForm>();

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
              onChange={(event) => {
                onChange(event.currentTarget.value);
              }}
              value={value}
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
