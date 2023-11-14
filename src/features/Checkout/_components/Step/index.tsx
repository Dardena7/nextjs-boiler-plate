import { FC, ReactElement } from 'react';
import clsx from 'clsx';
import { RoundedContainer } from '@/core/components/RoundedContainer';

type Props = {
  stepTitle: string;
  currentStep: number;
  setCurrentStep: (v: number) => void;
  stepNumber: number;
  className?: string;
  children?: ReactElement;
};

export const Step: FC<Props> = (props) => {
  const {
    stepTitle,
    currentStep,
    setCurrentStep,
    stepNumber,
    className,
    children,
  } = props;
  return (
    <div
      className={clsx(className, 'layout-row layout-align-start-center')}
      data-testid="checkout-step"
    >
      <RoundedContainer
        className={clsx(
          currentStep > stepNumber ? 'bg-primary-500' : 'bg-secondary-700',
          'mr-8 text-neutral-100 small'
        )}
        size={1.75}
      >
        {stepNumber.toString()}
      </RoundedContainer>

      <div className="py-16 px-32 border border-secondary-300 rounded-xl width-100">
        <p
          className="bold text-underline cursor-pointer"
          onClick={() => {
            if (currentStep <= stepNumber) return;
            setCurrentStep(stepNumber);
          }}
        >
          {stepTitle}
        </p>
        {children}
      </div>
    </div>
  );
};
