import { FC } from 'react';
import clsx from 'clsx';
import {
  useGetCart,
  useRemoveFromCart,
  useUpdateQuantity,
} from '@/core/repos/carts';
import { Button } from '@/core/components/Button';
import { Loader } from '@/core/components/Loader';
import { CartSummary } from './CartSummary';
import { useRouter } from 'next/router';

type Props = {
  className?: string;
};

export const Cart: FC<Props> = (props) => {
  const { className } = props;
  const router = useRouter();

  const { data: cart, isLoading } = useGetCart();
  const { cartItems } = cart || {};

  const hasProductInactive = cartItems?.some((item) => !item.product.active);

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

  if (isLoading)
    return (
      <div className="p-32 container-lg border-secondary-300 height-100">
        <Loader size={'md'} />
      </div>
    );

  return (
    <main className={clsx(className, 'height-100')} data-testid="cart-page">
      <div className="p-32 container-lg height-100">
        {/* $$alex ts */}
        <h1 className="mb-32 text-center">Cart</h1>

        {cart && (
          <CartSummary
            className="mb-32"
            removeFromCart={handleRemoveFromCart}
            updateQuantity={handleUpdateQuantity}
            cart={cart}
            isLoading={isLoadingUpdateQuantity || isLoadingRemoveFromCart}
          />
        )}
      </div>
      <div
        className="bg-neutral-100 border-top border-2 border-secondary-300"
        style={{ position: 'sticky', bottom: 0, zIndex: 1000 }}
      >
        <div className="px-32 py-16 container-lg">
          {/* $$alex ts */}
          <Button
            className="px-32 width-100"
            label={'Place the order'}
            style={'primary'}
            variant={'raised'}
            size={'lg'}
            onClick={() => router.push('/checkout')}
            disabled={!cart?.cartItems?.length || hasProductInactive}
          />
        </div>
      </div>
    </main>
  );
};
