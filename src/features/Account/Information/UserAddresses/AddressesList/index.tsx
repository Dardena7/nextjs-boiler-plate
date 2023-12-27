import { FC } from 'react';
import clsx from 'clsx';
import { Button } from '@/core/components/Button';
import { AddCircle } from '@mui/icons-material';
import { Address } from '@/core/types/generic';
import { AddressCard } from './AddressCard';

type Props = {
  addresses: Address[];
  onCreateAddress: () => void;
  onEditAddress: (address: Address) => void;
  className?: string;
};

export const AddressesList: FC<Props> = (props) => {
  const { addresses, onCreateAddress, onEditAddress, className } = props;
  return (
    <div className={clsx(className)} data-testid="addresses-list">
      <div className="layout-row layout-align-center">
        <Button
          className="mb-32"
          label={
            <div className="layout-row layout-align-start-center">
              <AddCircle fontSize="small" />
              {/* $$alex trans */}
              <span className="ml-8">New address</span>
            </div>
          }
          style={'primary'}
          variant={'raised'}
          size={'sm'}
          onClick={onCreateAddress}
        />
      </div>
      {/* $$alex trans */}
      {addresses.length === 0 ? (
        <p>No address registered</p>
      ) : (
        <div className="layout-row layout-wrap">
          {addresses.map((address, index) => {
            return (
              <AddressCard
                address={address}
                className="p-4"
                key={`address-${index}`}
                onEdit={() => onEditAddress(address)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
