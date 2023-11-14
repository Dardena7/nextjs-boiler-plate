import { FC } from 'react';
import clsx from 'clsx';
import { Step } from '../Step';
import { Address } from '@/core/types/generic';
import { AddressForm } from '@/core/forms/AddressForm';

type Props = {
  currentStep: number;
  setCurrentStep: (v: number) => void;
  deliveryAddress?: Partial<Address>;
  setDeliveryAddress: (address: Partial<Address>) => void;
  className?: string;
};

const STEP_NUMBER = 2;

export const DeliveryStep: FC<Props> = (props) => {
  const {
    deliveryAddress,
    setDeliveryAddress,
    currentStep,
    setCurrentStep,
    className,
  } = props;

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
          <AddressForm
            className="mt-16"
            address={deliveryAddress}
            onValidate={(address: Partial<Address>) => {
              setCurrentStep(STEP_NUMBER + 1);
              setDeliveryAddress(address);
            }}
          />
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
