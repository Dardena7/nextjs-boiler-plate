import { FC } from 'react';
import clsx from 'clsx';
import { Button } from '@/core/components/Button';
import { ArrowBack } from '@mui/icons-material';
import { AddressForm } from '@/core/forms/AddressForm';
import { Address } from '@/core/types/generic';

type Props = {
  content: 'edit' | 'create';
  onShowAddresses: () => void;
  onCreateAddress: (address: Partial<Address>) => void;
  onUpdateAddress: (address: Partial<Address>) => void;
  isLoadingCreate: boolean;
  isLoadingUpdate: boolean;
  editAddress?: Address;
  className?: string;
};

export const CreateEditAddress: FC<Props> = (props) => {
  const {
    content,
    onShowAddresses,
    onCreateAddress,
    onUpdateAddress,
    isLoadingCreate,
    isLoadingUpdate,
    editAddress,
    className,
  } = props;
  return (
    <div className={clsx(className)} data-testid="create-edit-address">
      <Button
        className="mb-16"
        label={
          <div className="layout-row layout-align-start-center">
            <ArrowBack fontSize="small" />
            {/* $$alex trans */}
            <span className="ml-8">List</span>
          </div>
        }
        style={'secondary'}
        variant={'outlined'}
        size={'xs'}
        onClick={onShowAddresses}
      />

      {content === 'create' && (
        <AddressForm onValidate={onCreateAddress} isLoading={isLoadingCreate} />
      )}

      {content === 'edit' && (
        <AddressForm
          address={editAddress}
          onValidate={onUpdateAddress}
          isLoading={isLoadingUpdate}
        />
      )}
    </div>
  );
};
