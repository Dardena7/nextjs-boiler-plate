import { string, object } from 'yup';

export const getValidationSchema = () => {
  return object().shape({
    name: object().shape({en: string()}).required(),
  });
}
