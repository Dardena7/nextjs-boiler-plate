import { Loader } from '@/core/components/Loader';
import { useGetOrders } from '@/core/repos/orders';
import { priceFormatter } from '@/core/utils';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export const Orders = () => {
  const { data: orders, isLoading } = useGetOrders();
  const { t } = useTranslation();

  const router = useRouter();

  if (isLoading)
    return (
      <div className="py-32 px-32 container-lg border-secondary-300 height-100">
        <Loader size={'md'} />
      </div>
    );

  return (
    <main className="height-100">
      <div className="p-32 container-lg" data-testid="orders">
        {/* $$alex ts */}
        <h1 className="mb-32 text-center">Orders</h1>

        <div className="p-16 rounded-md border border-secondary-300">
          {orders?.map((order, index) => {
            const { id, total, createdAt } = order;
            const date = new Date(createdAt);
            const formattedCreatedAt = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            const isLast = index === orders.length - 1;

            return (
              <div
                className={clsx(
                  !isLast && 'mb-8',
                  'p-16 clickable bg-primary-200 layout-row layout-align rounded-md medium'
                )}
                key={`order-${id}`}
                onClick={() => router.push(`/account/orders/${id}`)}
              >
                {/* $$alex ts */}
                <span className="width-50">
                  Order created at {formattedCreatedAt}
                </span>
                <span className="text-end width-50">
                  {priceFormatter.format(parseFloat(total))}
                </span>
                {/* $$alex todo: same component than order confirmation  */}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
