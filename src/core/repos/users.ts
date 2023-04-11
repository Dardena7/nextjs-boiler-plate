import { useMutation, useQuery, useQueryClient } from "react-query"
import { api } from "../api/api";
import { toast } from "../utils/toasts";
import { User } from "./types/generic";

type UpdateUserArgs = {
  firstname?: string;
  lastname?: string;
  termsAndConditions?: boolean;
}

const usersRepo = {
  getUser: async (userId: string): Promise<User> => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },
  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },
  updateUser: async (userId: string, args: UpdateUserArgs): Promise<User[]> => {
    const response = await api.patch(`/users/${userId}`, args);
    return response.data;
  }
}

export const useGetUsers = () => {
  return useQuery(['get-users'], () => {
    return usersRepo.getUsers();
  });
}

export const useGetUser = (userId: string, enabled = false) => {
  return useQuery(['get-user', userId], () => {
    return usersRepo.getUser(userId);
  }, { enabled });
}



export const useUpdateUser = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation((args: UpdateUserArgs) => {
    return usersRepo.updateUser(userId, args);
  }, {onSuccess: () => {
    //$$alex ts
    toast('User updated', 'success');
    queryClient.invalidateQueries(['get-user', userId]);
    queryClient.invalidateQueries(['get-users']);
  },
  onError: () => {
    //$$alex ts
    toast('An error occured!', 'error');
  }});
}