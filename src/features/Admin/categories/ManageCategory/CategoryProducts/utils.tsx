import { Button } from '@/core/components/Button';
import { Product } from '@/core/repos/types/generic';
import { CancelTwoTone } from '@mui/icons-material';
import clsx from 'clsx';
import Link from 'next/link';

export const getFormattedOptions = (
  products: Product[],
  categoryProducts: Product[]
) => {
  const filteredProducts = products.filter(
    (product) =>
      !categoryProducts.some(
        (categoryProduct) => categoryProduct.id === product.id
      )
  );
  return (
    filteredProducts?.map((product) => ({
      label: product.name || '',
      value: product.id,
    })) || []
  );
};

export const getDraggableProducts = (
  categoryProducts: Product[],
  removeProduct: (productId: number) => void
) => {
  return categoryProducts.map((product) => {
    const { id: productId } = product;
    return {
      id: productId,
      content: (
        <div className="width-100 layout-row layout-align-space-between-center">
          <Link
            href={`/admin/products/${productId}`}
            key={`product-${productId}`}
          >
            <p>
              <span className="mr-8">{productId}</span>
              <span className="text-underline">{product.name}</span>
            </p>
          </Link>
          <div>
            <CancelTwoTone
              className="text-danger-500 cursor-pointer"
              onClick={() => removeProduct(productId)}
            />
          </div>
        </div>
      ),
    };
  });
};
