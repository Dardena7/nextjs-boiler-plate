import { User } from "@/core/repos/types/generic";

export const getDefaultValues = (user: User) => {
  return {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    termsAndConditions: user.termsAndConditions
  };
};