import { FC, useState } from 'react';
import { Step } from '../Step';
import clsx from 'clsx';
import { Button } from '@/core/components/Button';
import { Radio } from '@mui/material';

type Props = {
  currentStep: number;
  setCurrentStep: (v: number) => void;
  paymentMethod?: string;
  setPaymentMethod: (v: string) => void;
  className?: string;
};

const STEP_NUMBER = 3;

export const PaymentMethodStep: FC<Props> = (props) => {
  const {
    paymentMethod,
    setPaymentMethod,
    currentStep,
    setCurrentStep,
    className,
  } = props;

  const [paymentOption, setPaymentOption] = useState(paymentMethod);

  return (
    <Step
      className={clsx(className)}
      // $$alex ts
      stepTitle={'Payment method'}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      stepNumber={STEP_NUMBER}
    >
      <div data-testid="payment-method-step">
        {currentStep === STEP_NUMBER && (
          <div className="mt-16">
            <div>
              <div>
                <Radio
                  checked={paymentOption === 'virement'}
                  value="virement"
                  onClick={() => setPaymentOption('virement')}
                />
                {/* $$alex ts */}
                <span>Par virement</span>
              </div>
              <div>
                <Radio
                  checked={paymentOption === 'card'}
                  value="card"
                  onClick={() => setPaymentOption('card')}
                />
                {/* $$alex ts */}
                <span>Par carte</span>
              </div>
            </div>
            <div className="layout-row layout-align-end-center">
              <Button
                label="Validate"
                style={'primary'}
                variant={'raised'}
                size={'md'}
                disabled={!paymentOption}
                onClick={() => {
                  if (!paymentOption) return;
                  setPaymentMethod(paymentOption);
                  setCurrentStep(STEP_NUMBER + 1);
                }}
              />
            </div>
          </div>
        )}
        {currentStep > STEP_NUMBER && (
          // $$alex ts
          <p className="mt-16">Payment method: {paymentMethod}</p>
        )}
      </div>
    </Step>
  );
};
