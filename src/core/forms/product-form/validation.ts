import { string, object, array, number } from 'yup';

export const getValidationSchema = () => {
  return object().shape({
    name: object().shape({ en: string() }).required(),
    price: number().min(0).required(),
    categories: array().of(number()),
    images: array(),
    imageIds: array().of(number()),
  });
};
