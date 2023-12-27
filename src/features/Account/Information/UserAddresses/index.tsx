import { FC, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Address, User } from '@/core/types/generic';
import { Skeleton } from '@mui/material';
import { Button } from '@/core/components/Button';
import { ArrowBack } from '@mui/icons-material';
import { AddressForm } from '@/core/forms/AddressForm';

import {
  useCreateUserAddress,
  useUpdateUserAddress,
} from '@/core/repos/addresses';
import { AddressesList } from './AddressesList';
import { CreateEditAddress } from './CreateEditAddress';

type Props = {
  user?: User;
  isLoadingUser: boolean;
};

export const UserAddresses: FC<Props> = (props) => {
  const { user, isLoadingUser } = props;
  const { addresses } = { ...user };

  const { t } = useTranslation();

  const [content, setContent] = useState<'show' | 'edit' | 'create'>('show');
  const [editAddress, setEditAddress] = useState<Address>();

  const { mutate: createAddress, isLoading: isLoadingCreate } =
    useCreateUserAddress();
  const { mutate: updateAddress, isLoading: isLoadingUpdate } =
    useUpdateUserAddress();

  const handleCreateAddress = (address: Partial<Address>) => {
    createAddress(address, {
      onSuccess: () => setContent('show'),
    });
  };

  const handleUpdateAddress = (address: Partial<Address>) => {
    if (!editAddress) return;
    updateAddress(
      { addressId: editAddress.id, address },
      {
        onSuccess: () => setContent('show'),
      }
    );
  };

  return (
    <div className="p-16 border border-secondary-300 rounded-sm">
      {/* $$alex trans */}
      <h2 className="mb-16">Addresses</h2>

      {!addresses || isLoadingUser ? (
        <div className="width-100">
          <Skeleton width="80%" height={20} />
          <Skeleton width="80%" height={20} />
          <Skeleton width="80%" height={20} />
        </div>
      ) : (
        <div>
          {content === 'show' ? (
            <AddressesList
              addresses={addresses}
              onCreateAddress={() => setContent('create')}
              onEditAddress={(address: Address) => {
                setEditAddress(address);
                setContent('edit');
              }}
            />
          ) : (
            <CreateEditAddress
              content={content}
              onShowAddresses={() => setContent('show')}
              onCreateAddress={handleCreateAddress}
              onUpdateAddress={handleUpdateAddress}
              editAddress={editAddress}
              isLoadingCreate={isLoadingCreate}
              isLoadingUpdate={isLoadingUpdate}
            />
          )}
        </div>
      )}
    </div>
  );
};
