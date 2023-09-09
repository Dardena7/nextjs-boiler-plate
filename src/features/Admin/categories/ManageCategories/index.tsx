import {
  useCreateCategory,
  useGetCategories,
  useMoveCategory,
  useUpdateCategory,
} from '@/core/repos/categories';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CategoryForm } from '../components/CategoryForm';
import { CategoryFormType } from '@/core/forms/category-form/types';
import { getDefaultValues } from '@/core/forms/category-form/utils';
import { getValidationSchema } from '@/core/forms/category-form/validation';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableList } from '@/core/components/DraggableList';
import { useEffect, useMemo, useState } from 'react';
import { DragItem } from '@/core/repos/types/generic';
import { getDraggableCategories } from './utils';
import { useUploadFiles } from '@/core/repos/files';
import { toast } from '@/core/utils/toasts';

export const ManageCategories = () => {
  const { data: categories } = useGetCategories();

  const { t } = useTranslation();

  const [droppedItem, setDroppedItem] = useState<DragItem>();

  const { mutate: createCategory } = useCreateCategory();
  const { mutate: moveCategory } = useMoveCategory();
  const { mutate: uploadFiles } = useUploadFiles();

  const { getValues, setValue, formState, reset, ...methods } =
    useForm<CategoryFormType>({
      mode: 'onChange',
      defaultValues: getDefaultValues(),
      resolver: yupResolver(getValidationSchema()),
    });

  const handleCreateCategory = (args: CategoryFormType) => {
    createCategory(args, {
      onSuccess: () => {
        reset();
      },
    });
  };

  const handleCreateCategoryWithBanner = (args: CategoryFormType) => {
    const formData = new FormData();
    const { images } = args;
    const image = images[images.length - 1];

    formData.append('files[]', image);

    uploadFiles(formData, {
      onSuccess: (response) => {
        const imageIds = response.blobIds;
        setValue('imageIds', imageIds);
        handleCreateCategory({ ...args, imageIds });
      },
      onError: () => {
        // $$alex ts
        toast('Banner error', 'error');
      },
    });
  };

  const handleSaveCategory = async () => {
    const args = getValues();
    if (!!args.images.length) return handleCreateCategoryWithBanner(args);
    return handleCreateCategory(args);
  };

  const draggableItems = useMemo(
    () => getDraggableCategories(categories || []),
    [categories]
  );

  useEffect(() => {
    if (!droppedItem) return;
    moveCategory({
      categoryId: droppedItem.id,
      position: droppedItem.index + 1,
    });
  }, [droppedItem]);

  return (
    <div className="py-32">
      <h1 className="mb-32 text-center">{t('pages:manageCategories.title')}</h1>
      <div className="container-md">
        <div className="mb-32 shadow-3 p-16">
          <h2 className="mb-16">
            {t('pages:manageCategories.createCategory')}
          </h2>
          <FormProvider
            getValues={getValues}
            reset={reset}
            setValue={setValue}
            formState={formState}
            {...methods}
          >
            <CategoryForm onSave={handleSaveCategory} />
          </FormProvider>
        </div>
        <div className="shadow-3 p-16">
          <h2 className="mb-16">{t('pages:manageCategories.title')}</h2>

          <DndProvider backend={HTML5Backend}>
            {draggableItems && (
              <DraggableList
                items={draggableItems}
                setDroppedItem={setDroppedItem}
              />
            )}
          </DndProvider>
        </div>
      </div>
    </div>
  );
};
