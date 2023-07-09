import { i18n } from "next-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../api/api";
import { toast } from "../utils/toasts";
import { Category } from "./types/generic";

type CreateCategoryArgs = {
  name: Record<string, string>;
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

const categoriesRepo = {
  getCategory: async (categoryId: number): Promise<Category> => {
    const response = await api.get(`/categories/${categoryId}`);
    return response.data;
  },
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get("/categories");
    return response.data;
  },
  createCategory: async (args: CreateCategoryArgs): Promise<Category> => {
    const response = await api.post(`/categories`, args);
    return response.data;
  },
  updateCategory: async (
    categoryId: number,
    args: Partial<CreateCategoryArgs>
  ): Promise<Category> => {
    const response = await api.patch(`/categories/${categoryId}`, args);
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

export const useGetCategories = () => {
  return useQuery(["get-categories", i18n?.language], () => {
    return categoriesRepo.getCategories();
  });
};

export const useGetCategory = (categoryId: number, enabled = false) => {
  return useQuery(
    ["get-category", categoryId],
    () => {
      return categoriesRepo.getCategory(categoryId);
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
        queryClient.invalidateQueries(["get-categories"]);
      },
    }
  );
};

export const useUpdateCategory = (categoryId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: Partial<CreateCategoryArgs>) => {
      return categoriesRepo.updateCategory(categoryId, args);
    },
    {
      onSuccess: () => {
        //$$alex ts
        toast("Category updated.", "success");
        queryClient.invalidateQueries(["get-category", categoryId]);
        queryClient.invalidateQueries(["get-categories"]);
      },
      onError: () => {
        //$$alex ts
        toast("An error occured!", "error");
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
        toast("Category updated.", "success");
        queryClient.invalidateQueries(["get-category", categoryId]);
        queryClient.invalidateQueries(["get-categories"]);
      },
      onError: () => {
        //$$alex ts
        toast("An error occured!", "error");
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
        toast("Category updated.", "success");
        queryClient.invalidateQueries(["get-category", categoryId]);
        queryClient.invalidateQueries(["get-categories"]);
      },
      onError: () => {
        //$$alex ts
        toast("An error occured!", "error");
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
