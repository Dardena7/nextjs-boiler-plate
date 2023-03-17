import { Button } from "@/core/components/Button";
import { getValidationSchema } from "@/core/forms/user-form/validation";
import clsx from "clsx";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TermsAndConditionsQuestion } from "@/core/forms/user-form/questions/TermsAndConditionsQuestion";
import { TextQuestion } from "@/core/forms/user-form/questions/TextQuestion";
import { getDefaultValues } from "@/core/forms/user-form/utils";

import type { FC } from "react";
import type { User } from "@/core/repos/types/generic";
import type { UserForm } from "@/core/forms/user-form/types";
import { useUpdateUser } from "@/core/repos/users";

type Props = {
  user: User;
  setEditUser: (v: boolean) => void;
  className?: string;
};

export const EditUserInformation: FC<Props> = (props) => {
  const { user, setEditUser, className } = props;

  const { getValues, formState, ...methods } = useForm<UserForm>({
    mode: "onChange",
    defaultValues: getDefaultValues(user),
    resolver: yupResolver(getValidationSchema()),
  });

  const { mutate: updateUser, isLoading: isLoadingUpdateUser } = useUpdateUser(
    user.auth0Id
  );

  const handleUpdateUser = () => {
    const { firstname, lastname, termsAndConditions } = getValues();
    const args = {
      ...(firstname && { firstname }),
      ...(lastname && { lastname }),
      ...(termsAndConditions && { termsAndConditions }),
    };
    updateUser(args, {
      onSuccess: () => setEditUser(false),
    });
  };

  return (
    <div className={clsx(className)}>
      <FormProvider formState={formState} getValues={getValues} {...methods}>
        <TextQuestion name="firstname" label="Firstname" className="mb-16" />
        <TextQuestion name="lastname" label="Lastname" className="mb-16" />
        {!user.termsAndConditions && <TermsAndConditionsQuestion />}
      </FormProvider>

      <div className="mt-32 layout-row layout-align-end">
        <Button
          className="mr-8"
          label="Cancel"
          style="secondary"
          variant="light"
          size="sm"
          onClick={() => {
            setEditUser(false);
          }}
        />
        <Button
          label="Save information"
          style="success"
          variant="light"
          size="sm"
          onClick={() => handleUpdateUser()}
          disabled={!formState.isValid || isLoadingUpdateUser}
        />
      </div>
    </div>
  );
};
