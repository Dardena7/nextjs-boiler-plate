import { i18n } from "next-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query"
import { api } from "../api/api";
import { Product } from "./types/generic";

// type UpdateUserArgs = {
//   firstname?: string;
//   lastname?: string;
//   termsAndConditions?: boolean;
// }

const usersRepo = {
  // getUser: async (userId: string): Promise<User> => {
  //   const response = await api.get(`/users/${userId}`);
  //   return response.data;
  // },
  getProducts: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },
  // updateUser: async (userId: string, args: UpdateUserArgs): Promise<User[]> => {
  //   const response = await api.patch(`/users/${userId}`, args);
  //   return response.data;
  // }
}

export const useGetProducts = () => {
  return useQuery(['get-products', i18n?.language], () => {
    return usersRepo.getProducts();
  });
}

// export const useGetUser = (userId: string, enabled = false) => {
//   return useQuery(['get-user', userId], () => {
//     return usersRepo.getUser(userId);
//   }, { enabled });
// }



// export const useUpdateUser = (userId: string) => {
//   const queryClient = useQueryClient();
//   return useMutation((args: UpdateUserArgs) => {
//     return usersRepo.updateUser(userId, args);
//   }, {onSuccess: () => {
//     queryClient.invalidateQueries(['get-user', userId]);
//   }});
// }