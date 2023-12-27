import { FC } from 'react';
import clsx from 'clsx';
import { Address } from '@/core/types/generic';
import { Button } from '@/core/components/Button';
import { Cancel, Edit } from '@mui/icons-material';
import { useDeleteUserAddress } from '@/core/repos/addresses';
import * as S from './styles';

type Props = {
  address: Address;
  onSelectAddress: () => void;
  className?: string;
};

export const AddressCard: FC<Props> = (props) => {
  const { address, onSelectAddress, className } = props;
  const { completeName, country, city, zip, street } = address;

  return (
    <S.AddressCard
      className={clsx(className, 'flex')}
      data-testid="address-card"
    >
      <div className="p-8 layout-column layout-align-space-between border border-secondary-300 rounded-md small medium width-100">
        <div>
          <p>{completeName}</p>
          <p>{country}</p>
          <p>{city}</p>
          <p>{street}</p>
        </div>

        <div className="mt-16 layout-row layout-align-center">
          {/* $$alex ts */}
          <Button
            className="mr-8"
            label="Select"
            style={'primary'}
            variant={'outlined'}
            size={'xs'}
            onClick={onSelectAddress}
          />
        </div>
      </div>
    </S.AddressCard>
  );
};
