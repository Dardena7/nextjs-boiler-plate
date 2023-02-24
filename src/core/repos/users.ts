import { useQuery } from "react-query"
import { api } from "../api";

const usersRepo = {
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  }
}

export const useGetUsers = () => {
  return useQuery(['get-users'], () => {
    return usersRepo.getUsers();
  });
}