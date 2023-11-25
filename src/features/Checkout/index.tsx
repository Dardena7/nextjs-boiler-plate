import { Button } from '@/core/components/Button';
import { Loader } from '@/core/components/Loader';
import { useUserProfile } from '@/core/hooks/use-user-profile';
import { Address } from '@/core/types/generic';
import { ArrowBack } from '@mui/icons-material';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useState } from 'react';
import { IdentificationStep } from './_components';
import { DeliveryStep } from './_components/DeliveryStep';
import { PaymentMethodStep } from './_components/PaymentMethodStep';
import { TermsAndConditionsStep } from './_components/TermsAndConditionsStep';
import { useCreateOrder } from '@/core/repos/orders';
import { useGetCart } from '@/core/repos/carts';
import { useRouter } from 'next/router';

type Props = {
  className?: string;
};

export const Checkout: FC<Props> = (props) => {
  const { className } = props;
  const router = useRouter();

  const { userProfile: user, isLoading: isLoadingUser } = useUserProfile();
  const { t } = useTranslation();

  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState<Partial<Address>>();
  const [paymentMethod, setPaymentMethod] = useState<string>();
  const [guestEmail, setGuestEmail] = useState<string>();

  const { data: cart, isLoading: isLoadingCart } = useGetCart();
  // $$alex todo: loader create order
  const { mutate: createOrder, isLoading: isLoadingCreateOrder } =
    useCreateOrder();

  const handleCreateOrder = () => {
    if (!cart || !deliveryAddress) return;

    const args = {
      cartId: cart.id,
      address: deliveryAddress,
    };

    createOrder(args, {
      onSuccess: (response) => {
        router.push(`/order-confirmation/${response.order.uuid}`);
      },
    });
  };

  useEffect(() => {
    if (user) setCurrentStep(2);
  }, [user]);

  if (isLoadingUser || isLoadingCart)
    return (
      <div className="py-32 px-32 container-lg border-secondary-300 height-100">
        <Loader size={'md'} />
      </div>
    );

  return (
    <main className={clsx(className)}>
      <div className="py-32 px-32 container-lg border-secondary-300 height-100">
        {/* $$alex trans */}
        <h1 className="mb-32 text-center">Checkout</h1>

        <Button
          className="mb-32"
          label={
            <div className="layout-row layout-align-start-center">
              <ArrowBack fontSize="small" />
              {/* $$alex trans */}
              <span className="ml-8">Return to cart</span>
            </div>
          }
          style={'secondary'}
          variant={'outlined'}
          size={'sm'}
          onClick={() => router.push('/cart')}
        />

        {/* STEP 1 */}
        <IdentificationStep
          className="mb-32"
          user={user}
          guestEmail={guestEmail}
          setGuestEmail={setGuestEmail}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />

        {/* STEP 2 */}
        <DeliveryStep
          className="mb-32"
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          setDeliveryAddress={setDeliveryAddress}
          deliveryAddress={deliveryAddress}
        />

        {/* STEP 3 */}
        <PaymentMethodStep
          className="mb-32"
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />

        <TermsAndConditionsStep
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>

      <div
        className="mt-32 px-32 py-16 layout-row layout-align-end-center bg-neutral-100 border-top border-2 border-secondary-300"
        style={{ position: 'sticky', bottom: 0, zIndex: 1000 }}
      >
        {/* $$alex ts */}
        <Button
          className="px-32 bold width-100"
          label={'Proceed to payment'}
          style={'success'}
          variant={'light'}
          size={'lg'}
          disabled={currentStep !== 5}
          onClick={handleCreateOrder}
        />
      </div>
    </main>
  );
};
