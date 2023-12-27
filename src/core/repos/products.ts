import { i18n } from 'next-i18next';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api } from '../api/api';
import { toast } from '../utils/toasts';
import { Product } from '@/core/types/generic';
import { formatUrlParams } from '../utils';

type CreateProductArgs = {
  name: Record<string, string>;
  price: string;
  categories: number[];
};

type UpdateProductArgs = {
  name?: Record<string, string>;
  categories?: number[];
  active?: boolean;
};

type GetProductOptions = {
  showInactive: boolean;
};

export const cacheKey = {
  getProducts: (locale: string, showInactive: boolean) => [
    'get-products',
    locale,
    showInactive,
  ],
  getProduct: (productId: number, locale: string) => [
    'get-product',
    productId,
    locale,
  ],
};

export const urls = {
  getProducts: () => {
    return `/products`;
  },
  getProduct: (productId: number) => `/products/${productId}`,
};

export const productsRepo = {
  getProduct: async (productId: number): Promise<Product> => {
    const response = await api.get(urls.getProduct(productId));
    return response.data;
  },
  getProducts: async (options: GetProductOptions): Promise<Product[]> => {
    const response = await api.get(urls.getProducts(), {
      params: options,
    });
    return response.data;
  },
  createProduct: async (args: CreateProductArgs): Promise<Product> => {
    const response = await api.post(`/products`, args);
    return response.data;
  },
  updateProduct: async (
    productId: number,
    args: Partial<UpdateProductArgs>
  ): Promise<Product[]> => {
    const response = await api.patch(`/products/${productId}`, args);
    return response.data;
  },
  deleteProduct: async (productId: number): Promise<{ success: boolean }> => {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  },
  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await api.get(`/products/search?query=${query}`);
    return response.data;
  },
};

export const useGetProducts = (options = { showInactive: false }) => {
  const { showInactive } = options;
  return useQuery(
    cacheKey.getProducts(i18n?.language || 'en', showInactive),
    () => {
      return productsRepo.getProducts(options);
    }
  );
};

export const useGetProduct = (productId: number, enabled = false) => {
  return useQuery(
    cacheKey.getProduct(productId, i18n?.language || 'en'),
    () => {
      return productsRepo.getProduct(productId);
    },
    { enabled }
  );
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: CreateProductArgs) => {
      return productsRepo.createProduct(args);
    },
    {
      onSuccess: () => {
        //$$alex ts
        toast('Product created.', 'success');
        queryClient.invalidateQueries(['get-products']);
      },
      onError: () => {
        //$$alex ts
        toast('An error occured!', 'error');
      },
    }
  );
};

export const useUpdateProduct = (productId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: Partial<UpdateProductArgs>) => {
      return productsRepo.updateProduct(productId, args);
    },
    {
      onSuccess: () => {
        //$$alex ts
        toast('Product updated.', 'success');
        queryClient.invalidateQueries(['get-product', productId]);
        queryClient.invalidateQueries(['get-products']);
      },
      onError: () => {
        //$$alex ts
        toast('An error occured!', 'error');
      },
    }
  );
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (productId: number) => {
      return productsRepo.deleteProduct(productId);
    },
    {
      onSuccess: () => {
        //$$alex ts
        toast('Product deleted.', 'success');
        // queryClient.invalidateQueries(['get-product', productId]);
        queryClient.invalidateQueries(['get-products']);
      },
      onError: () => {
        //$$alex ts
        toast('An error occured!', 'error');
      },
    }
  );
};

export const useSearchProducts = (query: string, enabled = false) => {
  return useQuery(
    ['search-products', i18n?.language],
    () => {
      return productsRepo.searchProducts(query);
    },
    { enabled }
  );
};
