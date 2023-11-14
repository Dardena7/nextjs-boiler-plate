import { Cart } from '@/core/types/generic';

export const getCartItemsCount = (cart?: Cart) => {
  if (!cart) return 0;

  return Object.values(cart.cartItems).reduce((acc, cartItem) => {
    return acc + cartItem.quantity;
  }, 0);
};
