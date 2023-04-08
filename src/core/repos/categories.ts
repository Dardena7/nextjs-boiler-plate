import { i18n } from "next-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query"
import { api } from "../api/api";
import { Category } from "./types/generic";

type CreateCategoryArgs = {
  name: Record<string, string>;
}

const categoriesRepo = {
  getCategory: async (categoryId: string): Promise<Category> => {
    const response = await api.get(`/categories/${categoryId}`);
    return response.data;
  },
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },
  createCategory: async (args: CreateCategoryArgs): Promise<Category> => {
    const response = await api.post(`/categories`, args);
    return response.data;
  },
  updateCategory: async (categoryId: string, args: Partial<CreateCategoryArgs>): Promise<Category[]> => {
    const response = await api.patch(`/categories/${categoryId}`, args);
    return response.data;
  }
}

export const useGetCategories = () => {
  return useQuery(['get-categories', i18n?.language], () => {
    return categoriesRepo.getCategories();
  });
}

export const useGetCategory = (categoryId: string, enabled = false) => {
  return useQuery(['get-category', categoryId], () => {
    return categoriesRepo.getCategory(categoryId);
  }, { enabled });
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation((args: CreateCategoryArgs) => {
    return categoriesRepo.createCategory(args);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-categories']);
    }
  });
}

export const useUpdateCategory= (categoryId: string) => {
  const queryClient = useQueryClient();
  return useMutation((args: Partial<CreateCategoryArgs>) => {
    return categoriesRepo.updateCategory(categoryId, args);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-category', categoryId]);
      queryClient.invalidateQueries(['get-categories']);
    }
  });
}