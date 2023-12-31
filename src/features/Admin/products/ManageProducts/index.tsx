import { useCreateProduct, useGetProducts } from "@/core/repos/products";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { getDefaultValues } from "@/core/forms/product-form/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { getValidationSchema } from "@/core/forms/product-form/validation";
import { ProductForm } from "../components/ProductForm";
import { ProductFormType } from "@/core/forms/product-form/types";
import { useUploadFiles } from "@/core/repos/files";
import { CancelTwoTone } from "@mui/icons-material";

export const ManageProducts = () => {
  const { data: products } = useGetProducts();

  const { t } = useTranslation();

  const { mutate: createProduct } = useCreateProduct();
  const { mutate: uploadFiles } = useUploadFiles();

  const { getValues, setValue, formState, reset, handleSubmit, ...methods } =
    useForm<ProductFormType>({
      mode: "onChange",
      defaultValues: getDefaultValues(),
      resolver: yupResolver(getValidationSchema()),
    });

  const { isValid } = formState;

  const handleCreateProduct = (args: ProductFormType) => {
    createProduct(args, {
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
    });
  };

  const handleSaveProduct = async () => {
    const args = getValues();

    if (!!args.images.length) return handleCreateProductWithImages(args);
    return handleCreateProduct(args);
  };

  return (
    <div className="py-32">
      <h1 className="mb-32 text-center">{t("pages:manageProducts.title")}</h1>
      <div className="container-md">
        <div className="mb-32 shadow-3 p-16">
          <h2 className="mb-16">{t("pages:manageProducts.createProduct")}</h2>
          <FormProvider
            handleSubmit={handleSubmit}
            getValues={getValues}
            setValue={setValue}
            reset={reset}
            formState={formState}
            {...methods}
          >
            <ProductForm onSave={handleSaveProduct} isValid={isValid} />
          </FormProvider>
        </div>
        <div className="shadow-3 p-16">
          <h2 className="mb-16">{t("pages:manageProducts.title")}</h2>
          <ul>
            {products?.map((product, index) => {
              return (
                <div
                  key={`product-${index}`}
                  className="mb-4 p-8 layout-row layout-align-space-between-center border rounded-sm border-secondary-300 bg-neutral-100"
                >
                  <Link href={`/admin/products/${product.id}`}>
                    <p>
                      <span className="mr-8">{product.id}</span>
                      <span className="text-underline">{product.name}</span>
                    </p>
                  </Link>
                  <CancelTwoTone
                    className="text-danger-500 cursor-pointer"
                    onClick={() =>
                      console.log("$$alex remove product", product.id)
                    }
                  />
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
