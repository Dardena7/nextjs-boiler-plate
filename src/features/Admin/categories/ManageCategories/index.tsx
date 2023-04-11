import { useCreateCategory, useGetCategories } from "@/core/repos/categories";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CategoryForm } from "../components/CategoryForm";
import { CategoryFormType } from "@/core/forms/category-form/types";
import { getDefaultValues } from "@/core/forms/category-form/utils";
import { getValidationSchema } from "@/core/forms/category-form/validation";

export const ManageCategories = () => {
  const { data: categories } = useGetCategories();

  const { t } = useTranslation();

  const { mutate: createCategory } = useCreateCategory();

  const { getValues, formState, reset, ...methods } = useForm<CategoryFormType>(
    {
      mode: "onChange",
      defaultValues: getDefaultValues(),
      resolver: yupResolver(getValidationSchema()),
    }
  );

  const handleCreateCategory = () => {
    const args = getValues();
    createCategory(args, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div>
      <h1 className="my-32 text-center">{t("pages:manageCategories.title")}</h1>
      <div className="container-md">
        <div className="mb-32">
          <h2 className="mb-16">
            {t("pages:manageCategories.createCategory")}
          </h2>
          <FormProvider
            getValues={getValues}
            reset={reset}
            formState={formState}
            {...methods}
          >
            <CategoryForm onSave={handleCreateCategory} />
          </FormProvider>
        </div>
        <div>
          <h2 className="mb-16">{t("pages:manageCategories.title")}</h2>
          <ul>
            {categories?.map((category, index) => {
              return (
                <Link
                  href={`/admin/categories/${category.id}`}
                  key={`category-${index}`}
                >
                  <p className="mb-8">
                    <span className="mr-8">{category.id}</span>
                    <span>{category.name}</span>
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
