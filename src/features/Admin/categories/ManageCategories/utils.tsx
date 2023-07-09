import { Category } from "@/core/repos/types/generic";
import { CancelTwoTone } from "@mui/icons-material";
import Link from "next/link";

export const getDraggableCategories = (
  categories: Category[],
  removeCategory: (categoryId: number) => void
) => {
  return categories.map((category) => {
    const categoryId = category.id;
    return {
      id: categoryId,
      content: (
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
          <CancelTwoTone
            className="text-danger-500 cursor-pointer"
            onClick={() => removeCategory(categoryId)}
          />
        </div>
      ),
    };
  });
};
