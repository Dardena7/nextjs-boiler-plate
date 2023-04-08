export type Translation = Record<string, string>;

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
  translations?: {name: Translation}
}

export type Product = {
  id: number;
  name?: string;
  categories: Category[];
  translations?: {name: Translation}
}