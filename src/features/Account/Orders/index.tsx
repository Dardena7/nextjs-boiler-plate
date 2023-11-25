import { Loader } from '@/core/components/Loader';
import { useGetOrders } from '@/core/repos/orders';
import { priceFormatter } from '@/core/utils';
import { useTranslation } from 'next-i18next';

export const Orders = () => {
  const { data: orders, isLoading } = useGetOrders();
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
        <h1 className="mb-32 text-center">Orders</h1>

        <div>
          {orders?.map((order) => {
            const { id, total } = order;
            return (
              <div key={`order-${id}`}>
                {/* $$alex ts */}
                <span>Order: #{id}</span> |
                <span>{priceFormatter.format(parseFloat(total))}</span>
                {/* $$alex todo: same component than order confirmation  */}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
