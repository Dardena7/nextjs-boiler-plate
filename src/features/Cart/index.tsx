import { FC } from 'react';
import clsx from 'clsx';
import {
  useGetCart,
  useRemoveFromCart,
  useUpdateQuantity,
} from '@/core/repos/carts';
import { CartComponent } from '@/core/components/cart/CartComponent';

type Props = {
  className?: string;
};

export const Cart: FC<Props> = (props) => {
  const { className } = props;

  const { data: cart } = useGetCart();

  const { mutate: updateQuantity, isLoading: isLoadingUpdateQuantity } =
    useUpdateQuantity();
  const { mutate: removeFromCart, isLoading: isLoadingRemoveFromCart } =
    useRemoveFromCart();

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    updateQuantity({ productId, newQuantity });
  };

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart({ productId });
  };

  return (
    <main
      className={clsx(className, 'container-lg py-32')}
      data-testid="cart-page"
    >
      {/* $$alex ts */}
      <h1 className="mb-32 text-center">Cart</h1>

      {cart && (
        <CartComponent
          removeFromCart={handleRemoveFromCart}
          updateQuantity={handleUpdateQuantity}
          cart={cart}
          isLoading={isLoadingUpdateQuantity || isLoadingRemoveFromCart}
        />
      )}
    </main>
  );
};
