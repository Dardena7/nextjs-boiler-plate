import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import clsx from 'clsx';
import { FileDropInput } from '../../_components/FileDropInput';
import { useRouter } from 'next/router';
import { useGetCategory } from '@/core/repos/categories';

type Props = {
  className?: string;
};

export const BannerManager: FC<Props> = (props) => {
  const { className } = props;
  const router = useRouter();

  const { categoryId } = router.query;

  const { data: category } = useGetCategory(
    parseInt(categoryId as string),
    !!categoryId,
    { showInactiveProducts: true }
  );

  const banner = category?.images?.[0];

  const { getValues, watch } = useFormContext();

  const files = getValues('images') || [];
  const file = files[files.length - 1];

  const preview = file ? URL.createObjectURL(file) : undefined;

  watch('images');

  return (
    <div className={clsx(className)} data-testid="category-banner-manager">
      {/* $$alex ts */}
      <p className="mb-8 bold">Banner</p>
      <div className="relative">
        <Image
          className="width-100 rounded-sm"
          width="1200"
          height="200"
          src={
            preview || banner?.url || 'https://dummyimage.com/1200x400/000/fff'
          }
          onLoad={() => {
            preview && URL.revokeObjectURL(preview);
          }}
          alt={`category-banner`}
        />
        <div className="absolute width-100 p-16" style={{ bottom: 0, left: 0 }}>
          <FileDropInput
            dropzoneStyle="py-8"
            className="width-100"
            name={'images'}
            showPreview={false}
          />
        </div>
      </div>
    </div>
  );
};
