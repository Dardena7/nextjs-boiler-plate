import { useMutation, useQueryClient } from 'react-query';
import { api } from '../api/api';
import { toast } from '../utils/toasts';
import { Address } from '@/core/types/generic';

type UpdateUserAddressArgs = {
  addressId: number;
  address: Partial<Address>;
};

const addressesRepo = {
  createUserAddress: async (args: Partial<Address>): Promise<Address> => {
    const response = await api.post(`/addresses`, args);
    return response.data;
  },
  updateUserAddress: async (args: UpdateUserAddressArgs): Promise<Address> => {
    const response = await api.patch(`/addresses/${args.addressId}`, args);
    return response.data;
  },
  deleteUserAddress: async (
    addressId: number
  ): Promise<{ success: boolean }> => {
    const response = await api.delete(`/addresses/${addressId}`);
    return response.data;
  },
};

export const useCreateUserAddress = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: Partial<Address>) => {
      return addressesRepo.createUserAddress(args);
    },
    {
      onSuccess: () => {
        //$$alex ts
        toast('Address created', 'success');
        queryClient.invalidateQueries(['get-user']);
      },
      onError: () => {
        //$$alex ts
        toast('An error occured!', 'error');
      },
    }
  );
};

export const useDeleteUserAddress = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (addressId: number) => {
      return addressesRepo.deleteUserAddress(addressId);
    },
    {
      onSuccess: () => {
        //$$alex ts
        toast('Address deleted', 'success');
        queryClient.invalidateQueries(['get-user']);
      },
      onError: () => {
        //$$alex ts
        toast('An error occured!', 'error');
      },
    }
  );
};

export const useUpdateUserAddress = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: UpdateUserAddressArgs) => {
      return addressesRepo.updateUserAddress(args);
    },
    {
      onSuccess: () => {
        //$$alex ts
        toast('Address updated', 'success');
        queryClient.invalidateQueries(['get-user']);
      },
      onError: () => {
        //$$alex ts
        toast('An error occured!', 'error');
      },
    }
  );
};
