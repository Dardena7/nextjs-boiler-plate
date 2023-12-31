import { useGetCategory, useUpdateCategory } from "@/core/repos/categories";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { CategoryForm } from "../components/CategoryForm";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { getValidationSchema } from "@/core/forms/user-form/validation";
import { ArrowBack } from "@mui/icons-material";
import { Button } from "@/core/components/Button";
import { CategoryFormType } from "@/core/forms/category-form/types";
import { getDefaultValues } from "@/core/forms/category-form/utils";
import { CategoryProducts } from "./CategoryProducts";

export const ManageCategory = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  const { t } = useTranslation();

  const { data: category } = useGetCategory(
    parseInt(categoryId as string),
    !!categoryId
  );
  const { mutate: updateCategory } = useUpdateCategory(
    parseInt(categoryId as string)
  );

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

  useEffect(() => {
    if (!category) return;
    reset(getDefaultValues(category));
  }, [category]);

  return (
    <div className="py-32">
      <h1 className="my-32 text-center">
        {t("pages:manageCategory.title", { categoryId: category?.id })}
      </h1>
      <div className="container-md">
        <Button
          className="mb-16"
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
        <div className="mb-32 shadow-3 p-16">
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
        </div>

        {category && (
          <CategoryProducts className="shadow-3 p-16" category={category} />
        )}
      </div>
    </div>
  );
};
