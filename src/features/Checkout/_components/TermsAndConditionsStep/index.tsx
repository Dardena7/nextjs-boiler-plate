import { FC, useState } from 'react';
import { Step } from '../Step';
import clsx from 'clsx';
import { Button } from '@/core/components/Button';
import { Checkbox, FormControlLabel, Radio } from '@mui/material';
import { CheckBox } from '@mui/icons-material';

type Props = {
  currentStep: number;
  setCurrentStep: (v: number) => void;
  className?: string;
};

const STEP_NUMBER = 4;

export const TermsAndConditionsStep: FC<Props> = (props) => {
  const { currentStep, setCurrentStep, className } = props;

  const [agree, setAgree] = useState(false);

  return (
    <Step
      className={clsx(className)}
      // $$alex ts
      stepTitle={'Terms and conditions'}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      stepNumber={STEP_NUMBER}
    >
      <div className="mt-16" data-testid="terms-and-conditions-step">
        {currentStep === STEP_NUMBER && (
          <div>
            {/* $$alex ts */}
            <FormControlLabel
              className="bold"
              label={<p>I agree with the terms and conditions</p>}
              control={
                <Checkbox
                  onChange={(event) => {
                    setAgree(event.target.checked);
                  }}
                  value={agree}
                />
              }
            />
            <div className="layout-row layout-align-end-center">
              {/* $$alex ts */}
              <Button
                label="Validate"
                style={'primary'}
                variant={'raised'}
                size={'md'}
                disabled={!agree}
                onClick={() => {
                  setCurrentStep(STEP_NUMBER + 1);
                }}
              />
            </div>
          </div>
        )}

        {currentStep > STEP_NUMBER && (
          // $$alex ts
          <p className="mt-16">I agree with the terms and conditions</p>
        )}
      </div>
    </Step>
  );
};
