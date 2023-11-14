import { useGetCategory, useUpdateCategory } from '@/core/repos/categories';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { CategoryForm } from '../components/CategoryForm';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { getValidationSchema } from '@/core/forms/user-form/validation';
import { ArrowBack } from '@mui/icons-material';
import { Button } from '@/core/components/Button';
import { CategoryFormType } from '@/core/forms/category-form/types';
import { getDefaultValues } from '@/core/forms/category-form/utils';
import { CategoryProducts } from './CategoryProducts';
import { toast } from '@/core/utils/toasts';
import { useUploadFiles } from '@/core/repos/files';

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

  const { ...methods } = useForm<CategoryFormType>({
    mode: 'onChange',
    defaultValues: { name: undefined, products: [], imageIds: [] },
    resolver: yupResolver(getValidationSchema()),
  });

  const { getValues, setValue, reset } = methods;

  const { mutate: uploadFiles } = useUploadFiles();

  const handleUpdateCategory = (args: CategoryFormType) => {
    updateCategory(args, {
      onSuccess: () => {
        reset();
      },
    });
  };

  const handleUpdateCategoryWithBanner = (args: CategoryFormType) => {
    const formData = new FormData();
    const { images } = args;
    const image = images[images.length - 1];

    formData.append('files[]', image);

    uploadFiles(formData, {
      onSuccess: (response) => {
        const imageIds = response.blobIds;
        setValue('imageIds', imageIds);
        handleUpdateCategory({ ...args, imageIds });
      },
      onError: () => {
        // $$alex ts
        toast('Banner error', 'error');
      },
    });
  };

  const handleSaveCategory = async () => {
    const args = getValues();
    if (!!args.images.length) return handleUpdateCategoryWithBanner(args);
    return handleUpdateCategory(args);
  };

  useEffect(() => {
    if (!category) return;
    reset(getDefaultValues(category));
  }, [category]);

  return (
    <div className="py-32">
      <h1 className="my-32 text-center">
        {t('pages:manageCategory.title', { categoryId: category?.id })}
      </h1>
      <div className="container-md">
        <Button
          className="mb-16"
          label={
            <div className="layout-row layout-align-start-center">
              <ArrowBack fontSize="small" />
              <span className="ml-8">{t('common:back')}</span>
            </div>
          }
          style={'secondary'}
          variant={'outlined'}
          size={'sm'}
          onClick={() => router.push('/admin/categories')}
        />
        <div className="mb-32 shadow-3 p-16">
          <h2 className="mt-32 mb-16">
            {t('pages:manageCategory.editCategory')}
          </h2>

          <FormProvider {...methods}>
            <CategoryForm onSave={handleSaveCategory} />
          </FormProvider>
        </div>

        {category && (
          <CategoryProducts className="shadow-3 p-16" category={category} />
        )}
      </div>
    </div>
  );
};
