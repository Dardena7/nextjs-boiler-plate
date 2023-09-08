import { FC } from 'react';
import clsx from 'clsx';
import { useDeleteCategory, useUpdateCategory } from '@/core/repos/categories';
import Link from 'next/link';
import { Category } from '@/core/repos/types/generic';
import { CancelTwoTone } from '@mui/icons-material';

type Props = {
  category: Category;
};

export const CategoryItem: FC<Props> = (props) => {
  const { category } = props;

  const { id: categoryId, active } = category;
  const { mutate: updateCategory } = useUpdateCategory(categoryId);
  const { mutate: deleteCategory } = useDeleteCategory(categoryId);

  return (
    <div className="width-100 layout-row layout-align-space-between-center">
      <Link
        href={`/admin/categories/${categoryId}`}
        key={`category-${categoryId}`}
      >
        <p>
          <span className="mr-8">{categoryId}</span>
          <span className="text-underline">{category.name}</span>
        </p>
      </Link>
      <div className="layout-row layout-align-end-center">
        <span
          className={clsx(
            active ? 'text-warning-500' : 'text-primary-500',
            'small text-underline mr-8 cursor-pointer'
          )}
          onClick={() => updateCategory({ active: !active })}
        >
          {/* $$alex ts */}
          {active ? 'deactivate' : 'activate'}
        </span>
        <CancelTwoTone
          className="text-danger-500 cursor-pointer"
          onClick={() => deleteCategory()}
        />
      </div>
    </div>
  );
};
