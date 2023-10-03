import { FC } from 'react';
import clsx from 'clsx';
import { useGetProducts } from '@/core/repos/products';
import Image from 'next/image';
import * as S from './styles';
import { useGetCategory } from '@/core/repos/categories';
import { useRouter } from 'next/router';
import { ProductCard } from '@/core/components/ProductCard';

type Props = {
  className?: string;
};

export const Category: FC<Props> = (props) => {
  const { className } = props;
  const router = useRouter();
  const { categoryId } = router.query;

  const { data: category } = useGetCategory(
    parseInt(categoryId as string),
    !!categoryId
  );

  const { products } = category || {};

  return (
    <main className={clsx(className, 'bg-secondary-100')} data-testid="home">
      <img
        width="100%"
        height={300}
        src={category?.images?.[0]?.url || '/images/product-placeholder.png'}
        alt={category?.name || 'image'}
      />

      <div className="container-lg layout-row layout-align-start layout-wrap">
        {products?.map((product, index) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </main>
  );
};
