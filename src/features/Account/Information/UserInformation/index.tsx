import { Loader } from '@/core/components/Loader';
import { FC, useState } from 'react';
import { EditUserInformation } from './EditUserInformation';
import { ShowUserInformation } from './ShowUserInformation';
import { useTranslation } from 'next-i18next';
import { User } from '@/core/types/generic';
import clsx from 'clsx';
import { Button } from '@/core/components/Button';
import { ArrowBack } from '@mui/icons-material';
import { Skeleton } from '@mui/material';

type Props = {
  user?: User;
  isLoadingUser: boolean;
  className?: string;
};

export const UserInformation: FC<Props> = (props) => {
  const { user, isLoadingUser, className } = props;

  const { t } = useTranslation();
  const [editUser, setEditUser] = useState(false);

  return (
    <div
      className={clsx(className, 'p-16 border border-secondary-300 rounded-sm')}
    >
      <h2 className="mb-16">{t('pages:account.information')}</h2>

      {!user || isLoadingUser ? (
        <div className="width-100">
          <Skeleton width="80%" height={20} />
          <Skeleton width="80%" height={20} />
          <Skeleton width="80%" height={20} />
        </div>
      ) : (
        <>
          {editUser ? (
            <EditUserInformation user={user} setEditUser={setEditUser} />
          ) : (
            <ShowUserInformation user={user} setEditUser={setEditUser} />
          )}
        </>
      )}
    </div>
  );
};
