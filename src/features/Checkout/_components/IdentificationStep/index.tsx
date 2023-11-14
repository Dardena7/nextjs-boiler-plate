import { FC, useState } from 'react';
import clsx from 'clsx';
import { User } from '@/core/types/generic';
import { Step } from '../Step';
import { TextField } from '@mui/material';
import { Button } from '@/core/components/Button';

type Props = {
  user?: User;
  guestEmail?: string;
  setGuestEmail: (v: string) => void;
  currentStep: number;
  setCurrentStep: (v: number) => void;
  className?: string;
};

const STEP_NUMBER = 1;

export const IdentificationStep: FC<Props> = (props) => {
  const {
    user,
    guestEmail,
    setGuestEmail,
    currentStep,
    setCurrentStep,
    className,
  } = props;

  const [isGuest, setIsGuest] = useState(false);

  return (
    <Step
      className={clsx(className)}
      // $$alex ts
      stepTitle={'Identification'}
      setCurrentStep={() => {
        if (user) return;
        setCurrentStep(STEP_NUMBER);
      }}
      currentStep={currentStep}
      stepNumber={STEP_NUMBER}
    >
      <div data-testid="identification-step">
        {currentStep === STEP_NUMBER && (
          <>
            {!user && !isGuest && (
              // $$alex ts
              <div className="mt-16">
                <span
                  className="bold text-underline text-primary-500 cursor-pointer"
                  onClick={() => window.open('/api/auth/logout', '_self')}
                >
                  Sign in
                </span>
                &nbsp;or&nbsp;
                <span
                  className="text-underline text-secondary-500 cursor-pointer"
                  onClick={() => setIsGuest(true)}
                >
                  order as a guest
                </span>
              </div>
            )}
            {isGuest && (
              <div className="mt-16">
                <div className="mb-16">
                  {/* $$alex ts */}
                  <p className="mb-16">Order as a guest:</p>

                  <TextField
                    className="mb-8"
                    label="Email"
                    variant="outlined"
                    onChange={(event) =>
                      setGuestEmail(event.currentTarget.value)
                    }
                    value={guestEmail || ''}
                    size="small"
                    fullWidth={true}
                    required={true}
                    type="email"
                  />
                  {/* $$alex ts */}

                  <p>
                    I prefer to&nbsp;
                    <span
                      className="bold text-underline text-primary-500 cursor-pointer"
                      onClick={() => window.open('/api/auth/logout', '_self')}
                    >
                      sign in
                    </span>
                    .
                  </p>
                </div>

                <div className="layout-row layout-align-end-center">
                  {/* $$alex ts */}
                  <Button
                    label="Validate"
                    style={'primary'}
                    variant={'raised'}
                    size={'md'}
                    disabled={!guestEmail}
                    onClick={() => {
                      setCurrentStep(STEP_NUMBER + 1);
                    }}
                  />
                </div>
              </div>
            )}
          </>
        )}
        {currentStep > STEP_NUMBER && (
          <div className="mt-16">{<p>{user ? user.email : guestEmail}</p>}</div>
        )}
      </div>
    </Step>
  );
};
