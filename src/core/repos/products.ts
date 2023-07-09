import { i18n } from "next-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../api/api";
import { toast } from "../utils/toasts";
import { Product } from "./types/generic";

type CreateProductArgs = {
  name: Record<string, string>;
  categories: number[];
};

const productsRepo = {
  getProduct: async (productId: string): Promise<Product> => {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  },
  getProducts: async (): Promise<Product[]> => {
    const response = await api.get("/products");
    return response.data;
  },
  createProduct: async (args: CreateProductArgs): Promise<Product> => {
    const response = await api.post(`/products`, args);
    return response.data;
  },
  updateProduct: async (
    productId: string,
    args: Partial<CreateProductArgs>
  ): Promise<Product[]> => {
    const response = await api.patch(`/products/${productId}`, args);
    return response.data;
  },
  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await api.get(`/products/search?query=${query}`);
    return response.data;
  },
};

export const useGetProducts = () => {
  return useQuery(["get-products", i18n?.language], () => {
    return productsRepo.getProducts();
  });
};

export const useGetProduct = (productId: string, enabled = false) => {
  return useQuery(
    ["get-product", productId],
    () => {
      return productsRepo.getProduct(productId);
    },
    { enabled }
  );
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: CreateProductArgs) => {
      return productsRepo.createProduct(args);
    },
    {
      onSuccess: () => {
        //$$alex ts
        toast("Product created.", "success");
        queryClient.invalidateQueries(["get-products"]);
      },
      onError: () => {
        //$$alex ts
        toast("An error occured!", "error");
      },
    }
  );
};

export const useUpdateProduct = (productId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: Partial<CreateProductArgs>) => {
      return productsRepo.updateProduct(productId, args);
    },
    {
      onSuccess: () => {
        //$$alex ts
        toast("Product updated.", "success");
        queryClient.invalidateQueries(["get-product", productId]);
        queryClient.invalidateQueries(["get-products"]);
      },
      onError: () => {
        //$$alex ts
        toast("An error occured!", "error");
      },
    }
  );
};

export const useSearchProducts = (query: string, enabled = false) => {
  return useQuery(
    ["search-products", i18n?.language],
    () => {
      return productsRepo.searchProducts(query);
    },
    { enabled }
  );
};
