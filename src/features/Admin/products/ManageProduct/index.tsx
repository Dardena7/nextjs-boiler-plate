import { useGetProduct, useUpdateProduct } from "@/core/repos/products";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { ProductForm } from "../components/ProductForm";
import { ProductFormType } from "@/core/forms/product-form/types";
import { getDefaultValues } from "@/core/forms/product-form/utils";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowBack } from "@mui/icons-material";
import { Button } from "@/core/components/Button";
import { useUploadFiles } from "@/core/repos/files";
import { getValidationSchema } from "@/core/forms/product-form/validation";
import { toast } from "@/core/utils/toasts";

export const ManageProduct = () => {
  const router = useRouter();
  const { productId } = router.query;

  const { t } = useTranslation();

  const { data: product } = useGetProduct(productId as string, !!productId);
  const { mutate: updateProduct } = useUpdateProduct(productId as string);
  const { mutate: uploadFiles } = useUploadFiles();

  const { getValues, setValue, formState, reset, ...methods } =
    useForm<ProductFormType>({
      mode: "onChange",
      defaultValues: { name: undefined, categories: [], imageIds: [] },
      resolver: yupResolver(getValidationSchema()),
    });

  const { isValid } = formState;

  const handleCreateProduct = (args: ProductFormType) => {
    updateProduct(args, {
      onSuccess: () => {
        reset();
      },
    });
  };

  const handleCreateProductWithImages = (args: ProductFormType) => {
    const formData = new FormData();

    args.images.forEach((image) => {
      formData.append("files[]", image);
    });

    uploadFiles(formData, {
      onSuccess: (response) => {
        const imageIds = [...args.imageIds, ...response.blobIds];
        setValue("imageIds", imageIds);
        handleCreateProduct({ ...args, imageIds });
      },
      onError: (err) => {
        toast("Hello", "success");
      },
    });
  };

  const handleUpdateProduct = async () => {
    const args = getValues();

    if (!!args.images.length) return handleCreateProductWithImages(args);
    return handleCreateProduct(args);
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
          setValue={setValue}
          reset={reset}
          formState={formState}
          {...methods}
        >
          <ProductForm onSave={handleUpdateProduct} isValid={isValid} />
        </FormProvider>
      </div>
    </div>
  );
};
