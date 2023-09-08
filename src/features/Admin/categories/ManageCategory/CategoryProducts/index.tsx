import { Button } from '@/core/components/Button';
import { DraggableList } from '@/core/components/DraggableList';
import { SingleSelectInput } from '@/core/forms/_components/select-inputs/SingleSelectInput';
import { useSearchProducts } from '@/core/repos/products';
import { Category, DragItem } from '@/core/repos/types/generic';
import clsx from 'clsx';
import { FC, useEffect, useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getDraggableProducts, getFormattedOptions } from './utils';
import {
  useAddCategoryProduct,
  useMoveCategoryProduct,
  useRemoveCategoryProduct,
} from '@/core/repos/categories';

type Props = {
  category: Category;
  className?: string;
};

type Option = { label: string; value: number };

export const CategoryProducts: FC<Props> = (props) => {
  const { className, category } = props;

  const [addProductValue, setAddProductValue] = useState<Option | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const { data: searchedProducts, refetch: searchProducts } =
    useSearchProducts(searchInput);

  const { mutate: addProduct, isLoading: isLoadingAddProduct } =
    useAddCategoryProduct(category.id);
  const { mutate: removeProduct } = useRemoveCategoryProduct(category.id);
  const { mutate: moveProduct } = useMoveCategoryProduct();

  const [droppedItem, setDroppedItem] = useState<DragItem>();

  const draggableItems = useMemo(
    () => getDraggableProducts(category.products, removeProduct),
    [category]
  );

  useEffect(() => {
    if (searchInput.length >= 3) searchProducts();
  }, [searchInput]);

  useEffect(() => {
    if (!droppedItem) return;
    moveProduct({
      categoryId: category.id,
      productId: droppedItem.id,
      position: droppedItem.index + 1,
    });
  }, [droppedItem]);

  return (
    <div className={clsx(className)}>
      {/* $$alex ts */}
      <h2 className="mb-16">Products</h2>
      {/* $$alex ts */}
      <SingleSelectInput
        className="mb-8"
        instanceId={'add-product'}
        placeholder={'Add a product'}
        value={addProductValue}
        options={getFormattedOptions(searchedProducts || [], category.products)}
        onInputChange={(input) => setSearchInput(input)}
        onChange={(value) => setAddProductValue(value as Option)}
      />
      {/* $$alex ts */}
      <Button
        label={'Add product'}
        style={'primary'}
        variant={'raised'}
        size={'sm'}
        className="mb-16"
        onClick={() => {
          if (!addProductValue) return;
          addProduct(addProductValue.value, {
            onSuccess: () => setAddProductValue(null),
          });
        }}
        disabled={isLoadingAddProduct || !addProductValue}
        loading={isLoadingAddProduct}
      />
      <DndProvider backend={HTML5Backend}>
        {draggableItems && (
          <DraggableList
            items={draggableItems}
            setDroppedItem={setDroppedItem}
          />
        )}
      </DndProvider>
    </div>
  );
};
