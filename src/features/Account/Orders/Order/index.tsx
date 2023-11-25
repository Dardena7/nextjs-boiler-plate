import { Loader } from '@/core/components/Loader';
import { useGetOrder } from '@/core/repos/orders';
import { priceFormatter } from '@/core/utils';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';

type Props = {
  orderId: number;
};

export const Order: FC<Props> = (props) => {
  const { orderId } = props;
  const { data: orders, isLoading } = useGetOrder(orderId);
  const { t } = useTranslation();

  if (isLoading)
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
      </div>
    </main>
  );
};
