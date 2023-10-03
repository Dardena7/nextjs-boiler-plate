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
    <main className={clsx(className, 'bg-secondary-100')} data-testid="home">
      <div className="container-lg layout-row layout-align-start layout-wrap">
        {products?.map((product, index) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </main>
  );
};
