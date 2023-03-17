import { string, object, boolean } from 'yup';

export const getValidationSchema = () => {
  return object().shape({
    firstname: string().required(),
    lastname: string().required(),
    email: string().email().required(),
    termsAndConditions: boolean().required().oneOf([true])
  });
}
