export type Translation = Record<string, string>;
export type FileData = {id: number, url: string};

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  auth0Id: string;
  termsAndConditions: boolean;
}

export type Category = {
  id: number;
  name?: string;
  products: Product[];
  translations?: {name: Translation}
}

export type Product = {
  id: number;
  name?: string;
  categories: Category[];
  images: FileData[];
  translations?: {name: Translation}
}