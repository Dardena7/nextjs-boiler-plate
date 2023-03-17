import { Checkbox, FormControlLabel } from "@mui/material";
import clsx from "clsx";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { UserForm } from "../../types";

type Props = {
  className?: string;
};

export const TermsAndConditionsQuestion: FC<Props> = (props) => {
  const { className } = props;
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
              label={<p className="bold">Accepts terms and conditions *</p>}
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
              * I agree to the processing and storage of my personal data in
              accordance with the GDPR regulations. I understand that my data
              may be used for the purposes of providing me with the requested
              services and that I have the right to access and amend my personal
              information at any time.
            </p>
          </div>
        );
      }}
    />
  );
};
