import { FC } from 'react';
import clsx from 'clsx';
import { Cart as CartType } from '@/core/types/generic';
import { priceFormatter } from '@/core/utils';
import {
  AddCircleTwoTone,
  CancelTwoTone,
  RemoveCircleTwoTone,
} from '@mui/icons-material';
import { Loader } from '@/core/components/Loader';

type Props = {
  className?: string;
  cart: CartType;
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
  isLoading?: boolean;
};

export const CartSummary: FC<Props> = (props) => {
  const { cart, updateQuantity, removeFromCart, isLoading, className } = props;

  const { cartItems, total } = cart;

  return (
    <>
      <div
        className={clsx(
          className,
          isLoading && 'opacity-50',
          'border border-secondary-300 shadow-2 rounded-sm'
        )}
        data-testid="cart-component"
      >
        {/* $$alex ts */}
        <header className="layout-row layout-align-start border-bottom border-secondary-300">
          <div className="p-32 text-center bold width-40 border-right border-secondary-300">
            Product
          </div>
          <div className="p-32 text-center bold width-20 border-right border-secondary-300">
            Unit price
          </div>
          <div className="p-32 text-center bold width-20 border-right border-secondary-300">
            Quantity
          </div>
          <div className="p-32 text-center bold width-20">Total</div>
        </header>

        <div>
          {cartItems.length === 0 ? (
            // $$alex trans
            <p className="p-32 text-center text-secondary-500 border-bottom border-secondary-300">
              No items yet
            </p>
          ) : (
            cartItems.map((cartItem) => {
              const { product, quantity, total } = cartItem;

              const { id: productId, price: unitPrice } = product;

              return (
                <div
                  className="layout-row layout-align-space-between-center border-bottom border-secondary-300"
                  key={productId}
                >
                  <div className="p-32 layout-row layout-align-start-center bold width-40 border-right border-secondary-300">
                    <div
                      className="cursor-pointer"
                      onClick={() => removeFromCart(productId)}
                    >
                      <CancelTwoTone className="text-danger-500 mr-16" />
                    </div>
                    <div>{product.name}</div>
                  </div>
                  <div className="p-32 medium text-center width-20 border-right border-secondary-300">
                    {priceFormatter.format(parseFloat(unitPrice))}
                  </div>
                  <div className="p-32 layout-row layout-align-center-center medium text-center width-20 border-right border-secondary-300">
                    <div
                      className="cursor-pointer"
                      onClick={() => updateQuantity(productId, quantity - 1)}
                    >
                      <RemoveCircleTwoTone className="text-secondary-500" />
                    </div>
                    <div className="mx-16 px-8 py-4 border border-secondary-500 rounded-sm">
                      {quantity}
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => updateQuantity(productId, quantity + 1)}
                    >
                      <AddCircleTwoTone className="text-secondary-500" />
                    </div>
                  </div>
                  <div className="p-32 medium width-20 text-end">
                    {priceFormatter.format(parseFloat(total))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* $$alex ts */}
        <div className="layout-row layout-align-space-between-center">
          <div className="bold p-32 width-80 border-right border-secondary-300">
            Total:
          </div>
          <div className="p-32">
            {priceFormatter.format(parseFloat(total || '0'))}
          </div>
        </div>
      </div>
      {isLoading && <Loader size={'md'} />}
    </>
  );
};
