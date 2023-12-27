import { FC } from 'react';
import clsx from 'clsx';
import { Address } from '@/core/types/generic';
import { Button } from '@/core/components/Button';
import { Cancel, Edit } from '@mui/icons-material';
import { useDeleteUserAddress } from '@/core/repos/addresses';
import * as S from './styles';

type Props = {
  address: Address;
  onEdit: () => void;
  className?: string;
};

export const AddressCard: FC<Props> = (props) => {
  const { address, onEdit, className } = props;
  const { completeName, country, city, zip, street } = address;

  const { mutate: deleteAddress, isLoading: isLoadingDelete } =
    useDeleteUserAddress();

  return (
    <S.AddressCard className={clsx(className)} data-testid="address-card">
      <div className="p-8 border border-secondary-300 rounded-md small medium">
        <p>{completeName}</p>
        <p>{country}</p>
        <p>{city}</p>
        <p>{street}</p>

        <div className="mt-16 layout-row layout-align-end">
          <Button
            className="mr-8"
            label={
              <div className="layout-row layout-align-start-center">
                <Cancel fontSize="small" />
                {/* $$alex trans */}
                <span className="ml-8">Delete</span>
              </div>
            }
            style={'danger'}
            variant={'light'}
            size={'xs'}
            loading={isLoadingDelete}
            disabled={isLoadingDelete}
            onClick={() => deleteAddress(address.id)}
          />
          <Button
            label={
              <div className="layout-row layout-align-start-center">
                <Edit fontSize="small" />
                {/* $$alex trans */}
                <span className="ml-8">Edit</span>
              </div>
            }
            style={'primary'}
            variant={'outlined'}
            size={'xs'}
            disabled={isLoadingDelete}
            onClick={onEdit}
          />
        </div>
      </div>
    </S.AddressCard>
  );
};
