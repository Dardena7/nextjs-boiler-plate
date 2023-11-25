import { FC } from 'react';
import clsx from 'clsx';
import { useGetOrderConfirmation } from '@/core/repos/orders';
import { Loader } from '@/core/components/Loader';
import { priceFormatter } from '@/core/utils';

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

  const { createdAt, total, orderItems, address } = order;
  const { completeName, street, country, zip, city } = address;
  const totalPrice = priceFormatter.format(parseFloat(total));
  const formattedCreatedAt = new Date(createdAt).toLocaleDateString();

  return (
    <div className={clsx(className, 'p-32')} data-testid="order-confirmation">
      {/* $$alex ts */}
      <h1 className="mb-32 text-center">Order summary</h1>

      <div className="mb-32  p-16 border border-secondary-300 rounded-sm">
        <p className="mb-2">
          {/* $$alex ts */}
          <span className="bold">Created at:</span> {formattedCreatedAt}
        </p>
        <p>
          {/* $$alex ts */}
          <span className="bold">Total:</span> {totalPrice}
        </p>
      </div>

      <div className="mb-32 p-16 border border-secondary-300 rounded-sm">
        {/* $$alex ts */}
        <h3 className="mb-16">Delivery address</h3>
        <p className="mb-2">{completeName}</p>
        <p className="mb-2">{country}</p>
        <p className="mb-2">
          <span>{zip}</span>
          <span>{city}</span>
        </p>
        <p>{street}</p>
      </div>

      <div className="p-16 border border-secondary-300 rounded-sm">
        {/* $$alex ts */}
        <h3 className="mb-16">Cart</h3>
        <div>
          {orderItems.map((orderItem) => {
            const { product, quantity, total } = orderItem;
            const { id, name } = product;
            const itemTotal = priceFormatter.format(parseFloat(total));

            return (
              <div className="mb-2" key={`item-${id}`}>
                <span>{name}</span>
                <span className="ml-4">x{quantity}</span>
                <span className="ml-8">{itemTotal}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
