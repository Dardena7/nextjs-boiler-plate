import { Checkbox, FormControlLabel } from "@mui/material";
import clsx from "clsx";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { UserForm } from "../../types";
import { useTranslation } from "next-i18next";

type Props = {
  className?: string;
};

export const TermsAndConditionsQuestion: FC<Props> = (props) => {
  const { className } = props;
  const { t } = useTranslation();
  const { control } = useFormContext<UserForm>();

  return (
    <Controller
      name="termsAndConditions"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <div className={clsx(className)}>
            <FormControlLabel
              className="bold"
              label={
                <p className="bold">{t("pages:account.termsAndConditions")}</p>
              }
              control={
                <Checkbox
                  onChange={(event) => {
                    onChange(event.target.checked);
                  }}
                  value={value}
                />
              }
            />

            <p className="small italic text-secondary-500">
              {t("pages:account.termsDescription")}
            </p>
          </div>
        );
      }}
    />
  );
};
