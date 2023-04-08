import { Product } from "@/core/repos/types/generic";

export const getDefaultValues = (product?: Product) => {
  return {
    ...(!!product && {name: product.translations?.name}),
    categories: product?.categories?.map(category => category.id) || []
  };
};