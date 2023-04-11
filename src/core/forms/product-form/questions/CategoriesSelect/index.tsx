import clsx from "clsx";
import { FC, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useGetCategories } from "@/core/repos/categories";
import { MultiSelectInput } from "@/core/forms/_components/select-inputs/MultiSelectInput";

type Props = {
  className?: string;
};

export const CategoriesSelect: FC<Props> = (props) => {
  const { className } = props;
  const { t } = useTranslation();
  const { control } = useFormContext();

  const { data: categories } = useGetCategories();

  const getFormattedOptions = () => {
    return (
      categories?.map((category) => ({
        label: category.name || "",
        value: category.id,
      })) || []
    );
  };

  const options = useMemo(() => getFormattedOptions(), [categories]);

  return (
    <div className={clsx(className)} data-testid="categories-select">
      <p className="mb-8 bold">{t("pages:category.categories")}</p>
      <Controller
        name="categories"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <MultiSelectInput
              instanceId={"categories-select"}
              placeholder={t("pages:category.selectCategories")}
              value={value}
              options={options}
              onChange={onChange}
            />
          );
        }}
      />
    </div>
  );
};
