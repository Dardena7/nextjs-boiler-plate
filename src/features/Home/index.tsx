import { FC } from 'react';
import clsx from 'clsx';
import { useGetProducts } from '@/core/repos/products';
import { ProductCard } from '@/core/components/ProductCard';

type Props = {
  className?: string;
};

export const Home: FC<Props> = (props) => {
  const { className } = props;

  const { data: products } = useGetProducts();

  return (
    <main
      className={clsx(
        className,
        'p-32 container-lg layout-row layout-align-start layout-wrap'
      )}
      data-testid="home"
    >
      {products?.map((product, index) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </main>
  );
};
