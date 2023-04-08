import { useGetProduct, useUpdateProduct } from "@/core/repos/products";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { ProductForm } from "../components/ProductForm";
import { ProductFormType } from "@/core/forms/product-form/types";
import { getDefaultValues } from "@/core/forms/product-form/utils";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { getValidationSchema } from "@/core/forms/user-form/validation";
import { ArrowBack } from "@mui/icons-material";
import { Button } from "@/core/components/Button";

export const ManageProduct = () => {
  const router = useRouter();
  const { productId } = router.query;

  const { t } = useTranslation();

  const { data: product } = useGetProduct(productId as string, !!productId);
  const { mutate: updateProduct } = useUpdateProduct(productId as string);

  const { getValues, formState, reset, ...methods } = useForm<ProductFormType>({
    mode: "onChange",
    defaultValues: { name: undefined, categories: [] },
    resolver: yupResolver(getValidationSchema()),
  });

  const handleUpdateProduct = () => {
    const args = getValues();
    updateProduct(args, {
      onSuccess: (res) => {
        //$$alex toast success
      },
      onError: (err) => {
        //$$alex toast error
      },
    });
  };

  useEffect(() => {
    if (!product) return;
    reset(getDefaultValues(product));
  }, [product]);

  return (
    <div>
      <h1 className="my-32 text-center">
        {t("pages:manageProduct.title", { productId: product?.id })}
      </h1>
      <div className="container-md">
        <Button
          label={
            <div className="layout-row layout-align-start-center">
              <ArrowBack fontSize="small" />
              <span className="ml-8">{t("common:back")}</span>
            </div>
          }
          style={"secondary"}
          variant={"outlined"}
          size={"sm"}
          onClick={() => router.push("/admin/products")}
        />
        <h2 className="mt-32 mb-16">{t("pages:manageProduct.editProduct")}</h2>
        <FormProvider
          getValues={getValues}
          reset={reset}
          formState={formState}
          {...methods}
        >
          <ProductForm onSave={handleUpdateProduct} />
        </FormProvider>
      </div>
    </div>
  );
};
