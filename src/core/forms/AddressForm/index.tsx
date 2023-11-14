import { FC } from 'react';
import clsx from 'clsx';
import { TextInput } from '../_components/TextInput';
import { FormProvider, useForm } from 'react-hook-form';
import { AddressForm as AddressFormType } from './types';
import { getDefaultValues } from './utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { getValidationSchema } from './validation';
import { Button } from '@/core/components/Button';
import { Address } from '@/core/types/generic';

type Props = {
  className?: string;
  address?: Partial<Address>;
  onValidate: (address: Partial<Address>) => void;
};

export const AddressForm: FC<Props> = (props) => {
  const { className, address, onValidate } = props;

  const { ...methods } = useForm<AddressFormType>({
    mode: 'onChange',
    defaultValues: getDefaultValues(address),
    resolver: yupResolver(getValidationSchema()),
  });

  const { formState } = methods;
  const { isValid } = formState;

  return (
    <div className={clsx(className)} data-testid="address-form">
      <FormProvider {...methods}>
        {/* $$alex ts */}

        <TextInput
          name="completeName"
          label="Complete name (firstname and lastname)"
          className="mb-16"
        />
        {/* $$alex ts */}

        <TextInput name="country" label="Country" className="mb-16" />
        {/* $$alex ts */}

        <TextInput name="street" label="Street" className="mb-16" />
        {/* $$alex ts */}

        <TextInput name="city" label="City" className="mb-16" />
        {/* $$alex ts */}

        <TextInput name="zip" label="Zip" className="mb-16" />

        <div className="layout-row layout-align-end-center">
          {/* $$alex ts */}

          <Button
            label={'Valider'}
            style={'primary'}
            variant={'raised'}
            size={'md'}
            disabled={!isValid}
            onClick={() => onValidate(methods.getValues())}
          />
        </div>
      </FormProvider>
    </div>
  );
};
