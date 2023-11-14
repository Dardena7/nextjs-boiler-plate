import { FC } from 'react';
import clsx from 'clsx';
import { Product } from '@/core/types/generic';
import Link from 'next/link';
import { CancelTwoTone } from '@mui/icons-material';
import { useDeleteProduct, useUpdateProduct } from '@/core/repos/products';

type Props = {
  className?: string;
  product: Product;
};

export const ProductItem: FC<Props> = (props) => {
  const { product } = props;
  const { id: productId, name, active } = product;

  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: updateProduct } = useUpdateProduct(productId);

  return (
    <div className="mb-4 p-8 layout-row layout-align-space-between-center border rounded-sm border-secondary-300 bg-neutral-100">
      <Link href={`/admin/products/${productId}`}>
        <p>
          <span className="mr-8">{productId}</span>
          <span className="text-underline">{name}</span>
        </p>
      </Link>
      <div className="layout-row layout-align-end-center">
        <span
          className={clsx(
            active ? 'text-warning-500' : 'text-primary-500',
            'small text-underline mr-8 cursor-pointer'
          )}
          onClick={() => updateProduct({ active: !active })}
        >
          {/* $$alex ts */}
          {active ? 'deactivate' : 'activate'}
        </span>
        <CancelTwoTone
          className="text-danger-500 cursor-pointer"
          onClick={() => deleteProduct(productId)}
        />
      </div>
    </div>
  );
};
