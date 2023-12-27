import { FC, useState } from 'react';
import clsx from 'clsx';
import { Step } from '../Step';
import { Address, User } from '@/core/types/generic';
import { AddressForm } from '@/core/forms/AddressForm';
import { AddressesList } from './AddressesList';
import { useCreateUserAddress } from '@/core/repos/addresses';
import { Button } from '@/core/components/Button';
import { ArrowBack } from '@mui/icons-material';

type Props = {
  user?: User;
  currentStep: number;
  setCurrentStep: (v: number) => void;
  deliveryAddress?: Partial<Address>;
  setDeliveryAddress: (address: Partial<Address>) => void;
  className?: string;
};

const STEP_NUMBER = 2;

export const DeliveryStep: FC<Props> = (props) => {
  const {
    user,
    deliveryAddress,
    setDeliveryAddress,
    currentStep,
    setCurrentStep,
    className,
  } = props;

  const [newAddress, setNewAddress] = useState(false);

  const { mutate: createAddress, isLoading: isLoadingCreate } =
    useCreateUserAddress();

  const handleCreateAddress = (address: Partial<Address>) => {
    createAddress(address, {
      onSuccess: () => onValidate(address),
    });
  };

  const onValidate = (address: Partial<Address>) => {
    setCurrentStep(STEP_NUMBER + 1);
    setDeliveryAddress(address);
  };

  return (
    <Step
      className={clsx(className)}
      // $$alex ts
      stepTitle={'Delivery Address'}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      stepNumber={STEP_NUMBER}
    >
      <div data-testid="delivery-step">
        {currentStep === STEP_NUMBER && (
          <>
            {user && !newAddress ? (
              <AddressesList
                className="mt-16"
                addresses={user.addresses}
                onCreateAddress={() => setNewAddress(true)}
                onSelectAddress={onValidate}
              />
            ) : (
              <div className="mt-16">
                {user && (
                  <Button
                    className="mt-16 mb-4"
                    label={
                      <div className="layout-row layout-align-start-center">
                        <ArrowBack fontSize="small" />
                        {/* $$alex trans */}
                        <span className="ml-8">List</span>
                      </div>
                    }
                    style={'secondary'}
                    variant={'outlined'}
                    size={'xs'}
                    onClick={() => setNewAddress(false)}
                  />
                )}
                <AddressForm
                  className="mt-16"
                  address={deliveryAddress}
                  onValidate={user ? handleCreateAddress : onValidate}
                />
              </div>
            )}
          </>
        )}
        {currentStep > STEP_NUMBER && (
          <div className="mt-16">
            <p>{deliveryAddress?.completeName}</p>
            <p>{deliveryAddress?.street}</p>
            <p>
              <span>{deliveryAddress?.zip}</span>&nbsp;
              <span>{deliveryAddress?.city}</span>
            </p>
            <p>{deliveryAddress?.country}</p>
          </div>
        )}
      </div>
    </Step>
  );
};
