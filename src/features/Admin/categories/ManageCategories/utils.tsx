import { Category } from '@/core/repos/types/generic';
import { CategoryItem } from './CategoryItem';

export const getDraggableCategories = (categories: Category[]) => {
  return categories.map((category) => {
    const { id: categoryId } = category;

    return {
      id: categoryId,
      content: <CategoryItem category={category} />,
    };
  });
};
