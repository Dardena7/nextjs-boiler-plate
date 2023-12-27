import { Order } from '@/core/types/generic';
import { priceFormatter } from '@/core/utils';
import { FC } from 'react';

type Props = {
  order: Order;
};

export const OrderSummary: FC<Props> = (props) => {
  const { order } = props;

  const { createdAt, total, orderItems, address, email } = order;
  const { completeName, street, country, zip, city } = address;
  const totalPrice = priceFormatter.format(parseFloat(total));
  const date = new Date(createdAt);
  const formattedCreatedAt = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  return (
    <div data-testid="order-summary-component">
      <div className="mb-32  p-16 border border-secondary-300 rounded-sm">
        <h3 className="mb-16">Information</h3>

        <p className="mb-4">
          {/* $$alex ts */}
          <span className="medium">Confirmation sent at:</span> {email}
        </p>
        <p className="mb-4">
          {/* $$alex ts */}
          <span className="medium">Created at:</span> {formattedCreatedAt}
        </p>
        <p>
          {/* $$alex ts */}
          <span className="medium">Total:</span> {totalPrice}
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
        <div className="mb-8 layout-row layout-align">
          {/* $$alex ts */}
          <div className="bold width-25">Product</div>
          <div className="bold width-25">Unit price</div>
          <div className="bold width-25">Quantity</div>
          <div className="bold width-25">total</div>
        </div>
        <div>
          {orderItems.map((orderItem) => {
            const { product, price, quantity, total } = orderItem;
            const { id, name } = product;
            const unitPrice = priceFormatter.format(parseFloat(price));
            const itemTotal = priceFormatter.format(parseFloat(total));

            return (
              <div className="mb-2 layout-row layout-align" key={`item-${id}`}>
                <div className="medium width-25">{name}</div>
                <div className="width-25">{unitPrice}</div>
                <div className="width-25">x{quantity}</div>
                <div className="width-25">{itemTotal}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
