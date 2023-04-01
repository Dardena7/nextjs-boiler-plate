import { useQuery } from "react-query"
import { api } from "../api/management-api";

const usersRepo = {
  getRoles: async () => {
    const response = await api.get('/roles');
    return response.data;
  }
}

export const useGetRoles = () => {
  return useQuery(['get-roles'], () => {
    return usersRepo.getRoles();
  });
}