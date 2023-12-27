import { FC } from 'react';
import clsx from 'clsx';
import { useGetOrderConfirmation } from '@/core/repos/orders';
import { Loader } from '@/core/components/Loader';
import { OrderSummary } from '@/core/components/OrderSummary';

type Props = {
  orderUuid: string;
  className?: string;
};

export const OrderConfirmation: FC<Props> = (props) => {
  const { orderUuid, className } = props;

  const { data: order, isLoading } = useGetOrderConfirmation(orderUuid);

  if (!order || isLoading)
    return (
      <div className="py-32 px-32 container-lg border-secondary-300 height-100">
        <Loader size={'md'} />
      </div>
    );

  return (
    <div
      className={clsx(className, 'p-32 container-lg')}
      data-testid="order-confirmation"
    >
      {/* $$alex ts */}
      <h1 className="mb-32 text-center">Order summary</h1>

      <OrderSummary order={order} />
    </div>
  );
};
