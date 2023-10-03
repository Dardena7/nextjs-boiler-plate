import { CartItem, GuestCart, Product } from '@/core/repos/types/generic';
import { toast } from '@/core/utils/toasts';

export const addToGuestCart = (product: Product, quantity: number) => {
  const cartString = localStorage.getItem('cart');
  const cartObject: GuestCart = cartString
    ? JSON.parse(cartString)
    : { cartItems: {}, total: 0 };

  if (cartObject.cartItems[product.id]) {
    const cartItem = cartObject.cartItems[product.id];
    cartItem.quantity += quantity;
    cartItem.total = (
      parseFloat(cartItem.product.price) * cartItem.quantity
    ).toString();
  } else {
    cartObject.cartItems[product.id] = {
      product,
      quantity,
      total: (quantity * parseFloat(product.price)).toString(),
    };
  }

  const cartTotal = Object.values(cartObject.cartItems).reduce(
    (acc: number, curr: CartItem) => {
      return acc + parseFloat(curr.total);
    },
    0
  );

  cartObject.total = cartTotal.toString();

  localStorage.setItem('cart', JSON.stringify(cartObject));

  //$$alex ts
  toast('Product added.', 'success');
};
