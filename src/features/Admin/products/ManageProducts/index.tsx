import { useCreateProduct, useGetProducts } from "@/core/repos/products";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { getDefaultValues } from "@/core/forms/product-form/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { getValidationSchema } from "@/core/forms/product-form/validation";
import { ProductForm } from "../components/ProductForm";
import { ProductFormType } from "@/core/forms/product-form/types";

export const ManageProducts = () => {
  const { data: products } = useGetProducts();

  const { t } = useTranslation();

  const { mutate: createProduct } = useCreateProduct();

  const { getValues, formState, reset, ...methods } = useForm<ProductFormType>({
    mode: "onChange",
    defaultValues: getDefaultValues(),
    resolver: yupResolver(getValidationSchema()),
  });

  const handleCreateProduct = () => {
    const args = getValues();
    createProduct(args, {
      onSuccess: () => {
        reset();
      },
      onError: (err) => {
        console.log("$$alex e", err);
      },
    });
  };

  return (
    <div>
      <h1 className="my-32 text-center">{t("pages:manageProducts.title")}</h1>
      <div className="container-md">
        <div className="mb-32">
          <h2 className="mb-16">{t("pages:manageProducts.createProduct")}</h2>
          <FormProvider
            getValues={getValues}
            reset={reset}
            formState={formState}
            {...methods}
          >
            <ProductForm onSave={handleCreateProduct} />
          </FormProvider>
        </div>
        <div>
          <h2 className="mb-16">{t("pages:manageProducts.title")}</h2>
          <ul>
            {products?.map((product, index) => {
              return (
                <Link
                  href={`/admin/products/${product.id}`}
                  key={`product-${index}`}
                >
                  <p className="mb-8">
                    <span className="mr-8">{product.id}</span>
                    <span>{product.name}</span>
                  </p>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
