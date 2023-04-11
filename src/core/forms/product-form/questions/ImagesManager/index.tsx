import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useGetProduct } from "@/core/repos/products";
import clsx from "clsx";
import { CancelTwoTone } from "@mui/icons-material";
import styles from "./ImagesManager.module.css";
import { ProductFormType } from "../../types";

type Props = {
  className?: string;
};

export const ImagesManager: FC<Props> = (props) => {
  const { className } = props;
  const router = useRouter();
  const { control } = useFormContext<ProductFormType>();

  const { productId } = router.query;

  const { t } = useTranslation();

  const { data: product } = useGetProduct(productId as string, !!productId);

  const findImage = (imageId: number) => {
    return product?.images.find((image) => image.id === imageId);
  };

  return (
    <div className={clsx(className)} data-testid="categories-select">
      {/* $$alex ts */}
      <p className="mb-8 bold">Images</p>
      <Controller
        name="imageIds"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          console.log("$$alex value", value);

          return (
            <div>
              {/* $$alex ts */}
              {!value?.length ? <p>No images</p> : null}

              {value?.map((imageId: number, index: number) => {
                const image = findImage(imageId);

                if (!image) return;

                return (
                  <div
                    key={`product-${product?.id}-image-${index}`}
                    className="m-4 display-inline-block rounded-md border border-secondary-300 shadow-3"
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      className={clsx(
                        styles["remove-file"],
                        "layout-row layout-align-center-center p-4 bg-danger-200 cursor-pointer"
                      )}
                      onClick={() => {
                        const updatedIds = [
                          ...value.slice(0, index),
                          ...value.slice(index + 1),
                        ];
                        onChange(updatedIds);
                      }}
                    >
                      <CancelTwoTone
                        className="text-danger-500 cursor-pointer"
                        style={{ fontSize: "16px" }}
                      />
                      {/* $$alex ts */}
                      <span className="ml-4 text-danger-500">Remove</span>
                    </div>
                    <Image
                      width="160"
                      height="120"
                      src={image?.url}
                      alt={`product-${product?.id}-image-${index}`}
                    />
                  </div>
                );
              })}
            </div>
          );
        }}
      />
    </div>
  );
};
