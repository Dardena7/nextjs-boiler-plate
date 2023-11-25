import { type } from 'os';

export type Translation = Record<string, string>;
export type FileData = { id: number; url: string };

export type UserRole = 'superadmin' | 'admin' | 'manager' | 'user';

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
  uuid: string | null;
};

export type Address = {
  id: number;
  completeName: string;
  country: string;
  street: string;
  city: string;
  zip: string;
};

export type OrderItem = {
  product: Product;
  price: string;
  quantity: number;
  total: string;
};

export type Order = {
  id: number;
  uuid: string;
  createdAt: string;
  address: Address;
  orderItems: OrderItem[];
  total: string;
};
