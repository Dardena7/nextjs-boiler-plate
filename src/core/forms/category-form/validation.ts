import { string, object, array, number } from 'yup';

export const getValidationSchema = () => {
  return object().shape({
    name: object().shape({en: string()}).required(),
    products: array().of(number())
  });
}
