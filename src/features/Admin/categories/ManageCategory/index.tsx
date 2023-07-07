import { useGetCategory, useUpdateCategory } from "@/core/repos/categories";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { CategoryForm } from "../components/CategoryForm";
import { useEffect, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { getValidationSchema } from "@/core/forms/user-form/validation";
import { ArrowBack } from "@mui/icons-material";
import { Button } from "@/core/components/Button";
import { CategoryFormType } from "@/core/forms/category-form/types";
import { getDefaultValues } from "@/core/forms/category-form/utils";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Link from "next/link";
import { DraggableList } from "@/core/components/DraggableList";

export const ManageCategory = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  const { t } = useTranslation();

  const { data: category } = useGetCategory(categoryId as string, !!categoryId);
  const { mutate: updateCategory } = useUpdateCategory(categoryId as string);

  const [newProductsPositions, setNewProductsPositions] = useState<number[]>();

  const { getValues, formState, reset, ...methods } = useForm<CategoryFormType>(
    {
      mode: "onChange",
      defaultValues: { name: undefined, products: [] },
      resolver: yupResolver(getValidationSchema()),
    }
  );

  const handleUpdateCategory = () => {
    const args = getValues();
    updateCategory(args, {
      onSuccess: (res) => {
        //$$alex toast success
      },
      onError: (err) => {
        //$$alex toast error
      },
    });
  };

  const draggableItems = useMemo(() => {
    return category?.products?.map((product) => {
      const productId = product.id;
      return {
        id: productId,
        content: (
          <Link
            href={`/admin/product/${productId}`}
            key={`product-${productId}`}
          >
            <p>
              <span className="mr-8">{productId}</span>
              <span>{product.name}</span>
            </p>
          </Link>
        ),
      };
    });
  }, [category]);

  useEffect(() => {
    if (!category) return;
    reset(getDefaultValues(category));
  }, [category]);

  return (
    <div>
      <h1 className="my-32 text-center">
        {t("pages:manageCategory.title", { categoryId: category?.id })}
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
          onClick={() => router.push("/admin/categories")}
        />

        <h2 className="mt-32 mb-16">
          {t("pages:manageCategory.editCategory")}
        </h2>

        <FormProvider
          getValues={getValues}
          reset={reset}
          formState={formState}
          {...methods}
        >
          <CategoryForm onSave={handleUpdateCategory} />
        </FormProvider>

        <div className="mt-32">
          {/* $$alex ts */}
          <h2 className="mb-16">Products</h2>
          <DndProvider backend={HTML5Backend}>
            {draggableItems && (
              <DraggableList
                items={draggableItems}
                setNewPositions={setNewProductsPositions}
              />
            )}
          </DndProvider>
        </div>
      </div>
    </div>
  );
};
