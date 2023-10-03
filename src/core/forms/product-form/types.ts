export type ProductFormType = {
  name: Record<string, string>;
  price: string;
  categories: number[];
  images: File[];
  imageIds: number[];
};
