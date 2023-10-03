export type Translation = Record<string, string>;
export type FileData = { id: number; url: string };

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  auth0Id: string;
  termsAndConditions: boolean;
};

export type Category = {
  id: number;
  active: boolean;
  name?: string;
  products: Product[];
  images: FileData[];
  translations?: { name: Translation };
};

export type Product = {
  id: number;
  active: boolean;
  name?: string;
  price: string;
  categories: Category[];
  images: FileData[];
  translations?: { name: Translation };
};

export type DragItem = {
  index: number;
  id: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
  total: string;
};

export type Cart = {
  id: number;
  cartItems: CartItem[];
  total: string;
};

export type GuestCart = {
  cartItems: Record<number, CartItem>;
  total: string;
};
