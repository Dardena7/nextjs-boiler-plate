import { TextField } from "@mui/material";
import clsx from "clsx";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  locale?: string;
  className?: string;
};

export const TranslationInput: FC<Props> = (props) => {
  const { name, label, locale = "en", className } = props;
  const { control } = useFormContext();

  const handleOnChange = (
    translations: Record<string, string>,
    newTranslation: string,
    locale: string,
    onChange: (...event: any[]) => void
  ) => {
    const newTranslations = { ...translations };
    newTranslations[locale] = newTranslation;
    onChange(newTranslations);
  };

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
                handleOnChange(
                  value,
                  event.currentTarget.value,
                  locale,
                  onChange
                );
              }}
              value={value?.[locale] || ""}
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
