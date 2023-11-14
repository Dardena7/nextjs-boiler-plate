import { Product } from '@/core/types/generic';

const getPrice = (price?: string) => {
  if (!price) return '';
  if (parseFloat(price) > 0) return price;
  return '';
};

export const getDefaultValues = (product?: Product) => {
  return {
    ...(!!product && { name: product.translations?.name }),
    price: getPrice(product?.price),
    categories: product?.categories?.map((category) => category.id) || [],
    images: [],
    imageIds: product?.images?.map((image) => image.id) || [],
  };
};
