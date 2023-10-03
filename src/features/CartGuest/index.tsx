import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { CartItem, GuestCart } from '@/core/repos/types/generic';
import { CartComponent } from '@/core/components/cart/CartComponent';

type Props = {
  className?: string;
};

const getCartData = () => {
  const cartString = localStorage.getItem('cart');
  return cartString ? JSON.parse(cartString) : { cartItems: {}, total: '0' };
};

export const CartGuest: FC<Props> = (props) => {
  const { className } = props;

  const [cart, setCart] = useState<GuestCart>({ cartItems: {}, total: '0' });
  const { cartItems, total } = cart;

  const formattedCartItems: CartItem[] = Object.values(cartItems);

  const handleRemoveFromCart = (productId: number) => {
    const cartItem = cartItems[productId as keyof typeof cartItems];
    const newTotal = parseFloat(total) - parseFloat(cartItem.total);

    const newCartItems = Object.keys(cartItems).reduce(
      (result: Record<number, CartItem>, key) => {
        const keyToInteger = parseInt(key);
        if (key !== productId.toString()) {
          result[keyToInteger] = cartItems[keyToInteger];
        }
        return result;
      },
      {}
    );
    const newCart = { cartItems: newCartItems, total: newTotal.toString() };
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) return handleRemoveFromCart(productId);

    const cartItem = cartItems[productId as keyof typeof cartItems];
    const newItemTotal = parseFloat(cartItem.product.price) * newQuantity;
    const newCartTotal =
      parseFloat(total) - parseFloat(cartItem.total) + newItemTotal;

    const newCartItem = {
      ...cartItem,
      quantity: newQuantity,
      total: newItemTotal.toString(),
    };

    const newCart = {
      cartItems: { ...cartItems, [productId]: newCartItem },
      total: newCartTotal.toString(),
    };

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  useEffect(() => {
    setCart(getCartData());
  }, []);

  return (
    <main
      className={clsx(className, 'container-lg py-32')}
      data-testid="cart-page"
    >
      {/* $$alex ts */}
      <h1 className="mb-32 text-center">Cart</h1>

      <CartComponent
        cart={{
          id: 0,
          cartItems: formattedCartItems,
          total,
        }}
        updateQuantity={handleUpdateQuantity}
        removeFromCart={handleRemoveFromCart}
      />
    </main>
  );
};
