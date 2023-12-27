import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api } from '../api/api';
import { toast } from '../utils/toasts';
import { i18n } from 'next-i18next';
import { Address, Order } from '@/core/types/generic';

type CreateOrderArgs = {
  cartId: number;
  address: Partial<Address>;
  email: string;
};

const ordersRepo = {
  getOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders');
    return response.data;
  },
  getOrder: async (id: number): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
  getOrderConfirmation: async (uuid: string): Promise<Order> => {
    const response = await api.get(`/orders/order_confirmation?uuid=${uuid}`);
    return response.data;
  },
  createOrder: async (args: CreateOrderArgs): Promise<{ order: Order }> => {
    const response = await api.post('/orders', {
      ...args,
    });
    return response.data;
  },
};

export const useGetOrder = (id: number) => {
  return useQuery(['get-order', i18n?.language], () => {
    return ordersRepo.getOrder(id);
  });
};

export const useGetOrders = () => {
  return useQuery(['get-orders', i18n?.language], () => {
    return ordersRepo.getOrders();
  });
};

export const useGetOrderConfirmation = (uuid: string) => {
  return useQuery(['get-order-confirmation', uuid, i18n?.language], () => {
    return ordersRepo.getOrderConfirmation(uuid);
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: CreateOrderArgs) => {
      return ordersRepo.createOrder(args);
    },
    {
      onSuccess: () => {
        //$$alex ts
        queryClient.invalidateQueries('get-cart');
      },
      onError: () => {
        //$$alex ts
        toast('An error occured!', 'error');
      },
    }
  );
};
