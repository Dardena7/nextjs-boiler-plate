import clsx from "clsx";
import { FC, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useGetProducts } from "@/core/repos/products";
import { MultiSelectInput } from "@/core/forms/_components/select-inputs/MultiSelectInput";

type Props = {
  className?: string;
};

export const ProductsSelect: FC<Props> = (props) => {
  const { className } = props;
  const { t } = useTranslation();
  const { control } = useFormContext();

  const { data: products } = useGetProducts();

  const getFormattedOptions = () => {
    return (
      products?.map((product) => ({
        label: product.name || "",
        value: product.id,
      })) || []
    );
  };

  const options = useMemo(() => getFormattedOptions(), [products]);

  return (
    <div className={clsx(className)} data-testid="products-select">
      <Controller
        name="products"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <MultiSelectInput
              instanceId={"products-select"}
              placeholder={t("pages:product.selectProducts")}
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
