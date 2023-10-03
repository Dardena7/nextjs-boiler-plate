import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api } from '../api/api';
import { toast } from '../utils/toasts';
import { i18n } from 'next-i18next';
import { Cart } from './types/generic';

type AddProductArgs = {
  productId: number;
  quantity: number;
};
type UpdateQuantityArgs = {
  productId: number;
  newQuantity: number;
};
type RemoveProductArgs = {
  productId: number;
};
type MergeCartArgs = {
  cartItems: {
    productId: number;
    quantity: number;
  }[];
};

const cartsRepo = {
  getCart: async (): Promise<Cart> => {
    const response = await api.get('/carts');
    return response.data;
  },
  addToCart: async (args: AddProductArgs): Promise<{ success: boolean }> => {
    const response = await api.patch('/carts/add_to_cart', args);
    return response.data;
  },
  updateQuantity: async (
    args: UpdateQuantityArgs
  ): Promise<{ success: boolean }> => {
    const response = await api.patch('/carts/update_quantity', args);
    return response.data;
  },
  removeFromCart: async (
    args: RemoveProductArgs
  ): Promise<{ success: boolean }> => {
    const response = await api.patch('/carts/remove_from_cart', args);
    return response.data;
  },
  mergeCart: async (args: MergeCartArgs): Promise<{ success: boolean }> => {
    const response = await api.patch('/carts/merge_cart', args);
    return response.data;
  },
};

export const useGetCart = () => {
  return useQuery(['get-cart', i18n?.language], () => {
    return cartsRepo.getCart();
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: AddProductArgs) => {
      return cartsRepo.addToCart(args);
    },
    {
      onSuccess: () => {
        //$$alex ts
        toast('Product added.', 'success');
        queryClient.invalidateQueries(['get-cart']);
      },
      onError: () => {
        //$$alex ts
        toast('An error occured!', 'error');
      },
    }
  );
};

export const useUpdateQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: UpdateQuantityArgs) => {
      return cartsRepo.updateQuantity(args);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['get-cart']);
      },
      onError: () => {
        //$$alex ts
        toast('An error occured!', 'error');
      },
    }
  );
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: RemoveProductArgs) => {
      return cartsRepo.removeFromCart(args);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['get-cart']);
      },
      onError: () => {
        //$$alex ts
        toast('An error occured!', 'error');
      },
    }
  );
};

export const useMergeCart = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: MergeCartArgs) => {
      return cartsRepo.mergeCart(args);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['get-cart']);
      },
      onError: () => {
        //$$alex ts
        toast('An error occured!', 'error');
      },
    }
  );
};
