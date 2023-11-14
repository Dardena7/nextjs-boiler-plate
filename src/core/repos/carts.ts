import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api } from '../api/api';
import { toast } from '../utils/toasts';
import { i18n } from 'next-i18next';
import { Cart } from '@/core/types/generic';

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

const cartsRepo = {
  getCart: async (cartUuid: string | null): Promise<Cart> => {
    const response = await api.get('/carts?uuid=' + cartUuid);
    return response.data;
  },
  addToCart: async (
    args: AddProductArgs,
    cartUuid: string | null
  ): Promise<{ success: boolean }> => {
    const response = await api.patch('/carts/add_to_cart', {
      ...args,
      uuid: cartUuid,
    });
    return response.data;
  },
  updateQuantity: async (
    args: UpdateQuantityArgs,
    cartUuid: string | null
  ): Promise<{ success: boolean }> => {
    const response = await api.patch('/carts/update_quantity', {
      ...args,
      uuid: cartUuid,
    });
    return response.data;
  },
  removeFromCart: async (
    args: RemoveProductArgs,
    cartUuid: string | null
  ): Promise<{ success: boolean }> => {
    const response = await api.patch('/carts/remove_from_cart', {
      ...args,
      uuid: cartUuid,
    });
    return response.data;
  },
};

export const useGetCart = () => {
  return useQuery(
    ['get-cart', i18n?.language],
    () => {
      const cartUuid = localStorage.getItem('cartUuid');
      return cartsRepo.getCart(cartUuid);
    },
    {
      onSuccess: (data) => {
        const { uuid } = data;
        if (!uuid) return;
        localStorage.setItem('cartUuid', uuid.toString());
      },
    }
  );
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: AddProductArgs) => {
      const cartUuid = localStorage.getItem('cartUuid');
      return cartsRepo.addToCart(args, cartUuid);
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
      const cartUuid = localStorage.getItem('cartUuid');
      return cartsRepo.updateQuantity(args, cartUuid);
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
      const cartUuid = localStorage.getItem('cartUuid');
      return cartsRepo.removeFromCart(args, cartUuid);
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
