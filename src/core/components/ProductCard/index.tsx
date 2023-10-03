import { FC } from 'react';
import Image from 'next/image';
import type { Product } from '@/core/repos/types/generic';
import * as S from './styles';
import clsx from 'clsx';
import { Button } from '../Button';
import { priceFormatter } from '@/core/utils';
import { useAddToCart } from '@/core/repos/carts';
import { useUserProfile } from '@/core/hooks/use-user-profile';
import { addToGuestCart } from './utils';

type Props = {
  className?: string;
  product: Product;
};

export const ProductCard: FC<Props> = (props) => {
  const { product, className } = props;

  const { oauthUser } = useUserProfile();

  const { name, price, categories, images } = product;

  const imageSrc = images?.[0]?.url || '/images/product-placeholder.png';

  const { mutate: addToCart } = useAddToCart();

  const handleAddToCart = (product: Product, quantity: number) => {
    if (oauthUser) return addToCart({ productId: product.id, quantity });
    addToGuestCart(product, quantity);
  };

  return (
    <S.ProductCard className={clsx(className, 'flex')}>
      <div className="p-8 m-8 width-100 layout-column rounded-sm border border-secondary-300 shadow-2">
        <Image
          width={300}
          height={200}
          layout="responsive"
          src={imageSrc}
          alt={name || 'image'}
          className="mb-16 border border-secondary-300 rounded-sm"
        />

        <div
          className="p-8 layout-column layout-align-space-between border border-secondary-300 rounded-sm"
          style={{ height: '-webkit-fill-available' }}
        >
          <div>
            <div className="mb-8">
              <p className="mb-4 bold">{name}</p>
              <p>{priceFormatter.format(parseFloat(price))}</p>
            </div>

            <div className="mb-16 layout-row layout-wrap">
              {categories.map((c) => {
                return (
                  <span
                    className="py-2 px-4 mr-4 mb-4 small rounded-sm text-secondary-500 bg-secondary-200"
                    key={c.id}
                  >
                    {c.name}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex layout-row layout-align-end-end">
            {/* $$alex ts */}
            <Button
              label={'Add to cart'}
              style={'primary'}
              variant={'raised'}
              size={'sm'}
              onClick={() => handleAddToCart(product, 1)}
            />
          </div>
        </div>
      </div>
    </S.ProductCard>
  );
};
