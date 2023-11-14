import { string, object, boolean } from 'yup';

export const getValidationSchema = () => {
  return object().shape({
    city: string().required(),
    completeName: string().required(),
    country: string().required(),
    street: string().required(),
    zip: string().required(),
  });
};
