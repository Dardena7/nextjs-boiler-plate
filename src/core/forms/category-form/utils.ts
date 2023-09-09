import { Category } from '@/core/repos/types/generic';

export const getDefaultValues = (category?: Category) => {
  return {
    ...(!!category && { name: category.translations?.name }),
    products: category?.products?.map((product) => product.id) || [],
    images: [],
    imageIds: category?.images?.map((image) => image.id) || [],
  };
};
