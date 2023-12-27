import { Button } from '@/core/components/Button';
import { Loader } from '@/core/components/Loader';
import { OrderSummary } from '@/core/components/OrderSummary';
import { useGetOrder } from '@/core/repos/orders';
import { ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { FC } from 'react';

type Props = {
  orderId: number;
};

export const Order: FC<Props> = (props) => {
  const { orderId } = props;

  const router = useRouter();
  const { t } = useTranslation();

  const { data: order, isLoading } = useGetOrder(orderId);

  if (isLoading || !order)
    return (
      <div className="py-32 px-32 container-lg border-secondary-300 height-100">
        <Loader size={'md'} />
      </div>
    );

  return (
    <main className="height-100">
      <div
        className="py-32 container-lg border-secondary-300"
        data-testid="orders"
      >
        {/* $$alex ts */}
        <h1 className="mb-32 text-center">Order</h1>

        <Button
          className="mb-32"
          label={
            <div className="layout-row layout-align-start-center">
              <ArrowBack fontSize="small" />
              {/* $$alex trans */}
              <span className="ml-8">Return to orders</span>
            </div>
          }
          style={'secondary'}
          variant={'outlined'}
          size={'sm'}
          onClick={() => router.push('/account/orders')}
        />

        <OrderSummary order={order} />
      </div>
    </main>
  );
};
