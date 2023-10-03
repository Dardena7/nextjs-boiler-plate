import { useUserProfile } from '@/core/hooks/use-user-profile';
import { useMergeCart } from '@/core/repos/carts';
import { useEffect } from 'react';

export const CartMerger = (props: any) => {
  const { children } = props;
  const { oauthUser } = useUserProfile();
  const { mutate: mergeCart } = useMergeCart();

  useEffect(() => {
    const cartString = localStorage.getItem('cart');

    if (!oauthUser) return;
    if (!cartString) return;

    const cartObject = JSON.parse(cartString);
    const cartItems = Object.values(cartObject.cartItems).map(
      (cartItem: any) => {
        const { product, quantity } = cartItem;
        return { productId: product.id, quantity };
      }
    );

    mergeCart({ cartItems });

    localStorage.removeItem('cart');
  }),
    [oauthUser];

  return <>{children}</>;
};
