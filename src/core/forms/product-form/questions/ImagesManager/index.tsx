import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useGetProduct } from "@/core/repos/products";
import clsx from "clsx";
import { ProductFormType } from "../../types";
import { FileWrapper } from "@/core/forms/_components/FileWrapper";

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
          return (
            <div>
              {/* $$alex ts */}
              {!value?.length ? <p>No images</p> : null}

              {value?.map((imageId: number, index: number) => {
                const image = findImage(imageId);

                if (!image) return;

                return (
                  <FileWrapper
                    key={`product-${product?.id}-image-${index}`}
                    onRemove={() => {
                      const updatedIds = [
                        ...value.slice(0, index),
                        ...value.slice(index + 1),
                      ];
                      onChange(updatedIds);
                    }}
                  >
                    <Image
                      width="160"
                      height="120"
                      src={image?.url}
                      alt={`product-${product?.id}-image-${index}`}
                    />
                  </FileWrapper>
                );
              })}
            </div>
          );
        }}
      />
    </div>
  );
};
