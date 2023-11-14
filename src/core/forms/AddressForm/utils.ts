import { Address } from '@/core/types/generic';

export const getDefaultValues = (address?: Partial<Address>) => {
  return {
    city: address?.city || '',
    completeName: address?.completeName || '',
    country: address?.country || '',
    street: address?.street || '',
    zip: address?.zip || '',
  };
};
