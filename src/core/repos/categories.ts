import { i18n } from 'next-i18next';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api } from '../api/api';
import { toast } from '../utils/toasts';
import { Category } from '@/core/types/generic';
import { type } from 'os';

type CreateCategoryArgs = {
  name: Record<string, string>;
};

type UpdateCategoryArgs = {
  name?: Record<string, string>;
  active?: boolean;
};

type MoveProductArgs = {
  categoryId: number;
  productId: number;
  position: number;
};

type MoveCategoryArgs = {
  categoryId: number;
  position: number;
};

type GetCategoryOptions = {
  showInactiveProducts: boolean;
};

type GetCategoriesOptions = {
  showInactive: boolean;
};

const categoriesRepo = {
  getCategory: async (
    categoryId: number,
    options: GetCategoryOptions
  ): Promise<Category> => {
    const response = await api.get(`/categories/${categoryId}`, {
      params: options,
    });
    return response.data;
  },
  getCategories: async (options: GetCategoriesOptions): Promise<Category[]> => {
    const response = await api.get('/categories', { params: options });
    return response.data;
  },
  createCategory: async (args: CreateCategoryArgs): Promise<Category> => {
    const response = await api.post(`/categories`, args);
    return response.data;
  },
  updateCategory: async (
    categoryId: number,
    args: Partial<UpdateCategoryArgs>
  ): Promise<Category> => {
    const response = await api.patch(`/categories/${categoryId}`, args);
    return response.data;
  },
  deleteCategory: async (categoryId: number): Promise<Category> => {
    const response = await api.delete(`/categories/${categoryId}`);
    return response.data;
  },
  addProduct: async (args: {
    categoryId: number;
    productId: number;
  }): Promise<{ success: boolean }> => {
    const response = await api.patch(`/categories/add_product`, args);
    return response.data;
  },
  removeProduct: async (args: {
    categoryId: number;
    productId: number;
  }): Promise<{ success: boolean }> => {
    const response = await api.patch(`/categories/remove_product`, args);
    return response.data;
  },
  moveProduct: async (args: MoveProductArgs): Promise<{ success: boolean }> => {
    const response = await api.patch(`/categories/move_product`, args);
    return response.data;
  },
  moveCategory: async (
    args: MoveCategoryArgs
  ): Promise<{ success: boolean }> => {
    const response = await api.patch(`/categories/move_category`, args);
    return response.data;
  },
};

export const useGetCategories = (options = { showInactive: false }) => {
  const { showInactive } = options;
  return useQuery(['get-categories', i18n?.language, showInactive], () => {
    return categoriesRepo.getCategories(options);
  });
};

export const useGetCategory = (
  categoryId: number,
  enabled = false,
  options: GetCategoryOptions = { showInactiveProducts: false }
) => {
  const { showInactiveProducts } = options;
  return useQuery(
    ['get-category', categoryId, i18n?.language, showInactiveProducts],
    () => {
      return categoriesRepo.getCategory(categoryId, options);
    },
    { enabled }
  );
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: CreateCategoryArgs) => {
      return categoriesRepo.createCategory(args);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['get-categories']);
      },
    }
  );
};

export const useUpdateCategory = (categoryId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: Partial<UpdateCategoryArgs>) => {
      return categoriesRepo.updateCategory(categoryId, args);
    },
    {
      onSuccess: () => {
        //$$alex ts
        toast('Category updated.', 'success');
        queryClient.invalidateQueries(['get-category', categoryId]);
        queryClient.invalidateQueries(['get-categories']);
      },
      onError: () => {
        //$$alex ts
        toast('An error occured!', 'error');
      },
    }
  );
};

export const useDeleteCategory = (categoryId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return categoriesRepo.deleteCategory(categoryId);
    },
    {
      onSuccess: () => {
        //$$alex ts
        toast('Category deleted.', 'success');
        queryClient.invalidateQueries(['get-categories']);
      },
      onError: () => {
        //$$alex ts
        toast('An error occured!', 'error');
      },
    }
  );
};

export const useAddCategoryProduct = (categoryId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    (productId: number) => {
      return categoriesRepo.addProduct({ categoryId, productId });
    },
    {
      onSuccess: () => {
        //$$alex ts
        toast('Category updated.', 'success');
        queryClient.invalidateQueries(['get-category', categoryId]);
        queryClient.invalidateQueries(['get-categories']);
      },
      onError: () => {
        //$$alex ts
        toast('An error occured!', 'error');
      },
    }
  );
};

export const useRemoveCategoryProduct = (categoryId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    (productId: number) => {
      return categoriesRepo.removeProduct({ categoryId, productId });
    },
    {
      onSuccess: () => {
        //$$alex ts
        toast('Category updated.', 'success');
        queryClient.invalidateQueries(['get-category', categoryId]);
        queryClient.invalidateQueries(['get-categories']);
      },
      onError: () => {
        //$$alex ts
        toast('An error occured!', 'error');
      },
    }
  );
};

export const useMoveCategoryProduct = () => {
  return useMutation((args: MoveProductArgs) => {
    return categoriesRepo.moveProduct(args);
  });
};

export const useMoveCategory = () => {
  return useMutation((args: MoveCategoryArgs) => {
    return categoriesRepo.moveCategory(args);
  });
};
