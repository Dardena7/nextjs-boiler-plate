import { Button } from '@/core/components/Button';
import { getValidationSchema } from '@/core/forms/user-form/validation';
import clsx from 'clsx';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TermsAndConditionsQuestion } from '@/core/forms/user-form/questions/TermsAndConditionsQuestion';
import { getDefaultValues } from '@/core/forms/user-form/utils';
import { useTranslation } from 'next-i18next';

import type { FC } from 'react';
import type { User } from '@/core/types/generic';
import type { UserForm } from '@/core/forms/user-form/types';
import { useUpdateUser } from '@/core/repos/users';
import { TextInput } from '@/core/forms/_components/TextInput';

type Props = {
  user: User;
  setEditUser: (v: boolean) => void;
  className?: string;
};

export const EditUserInformation: FC<Props> = (props) => {
  const { user, setEditUser, className } = props;

  const { t } = useTranslation();

  const { ...methods } = useForm<UserForm>({
    mode: 'onChange',
    defaultValues: getDefaultValues(user),
    resolver: yupResolver(getValidationSchema()),
  });

  const { getValues, formState } = methods;

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
      <FormProvider {...methods}>
        <TextInput
          name="firstname"
          label={t('pages:account.firstname')}
          className="mb-16"
        />
        <TextInput
          name="lastname"
          label={t('pages:account.lastname')}
          className="mb-16"
        />
        {!user.termsAndConditions && <TermsAndConditionsQuestion />}
      </FormProvider>

      <div className="mt-32 layout-row layout-align-end">
        <Button
          className="mr-8"
          label={t('common:cancel')}
          style="secondary"
          variant="light"
          size="sm"
          onClick={() => {
            setEditUser(false);
          }}
          disabled={isLoadingUpdateUser}
          loading={isLoadingUpdateUser}
        />
        <Button
          label={t('common:save')}
          style="success"
          variant="light"
          size="sm"
          onClick={() => handleUpdateUser()}
          disabled={!formState.isValid || isLoadingUpdateUser}
          loading={isLoadingUpdateUser}
        />
      </div>
    </div>
  );
};
