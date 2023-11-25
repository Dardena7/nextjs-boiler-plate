import { Loader } from '@/core/components/Loader';
import { FC, useState } from 'react';
import { EditUserInformation } from './EditUserInformation';
import { ShowUserInformation } from './ShowUserInformation';
import { useTranslation } from 'next-i18next';
import { User } from '@/core/types/generic';

type Props = {
  user?: User;
  isLoadingUser: boolean;
};

export const UserInformation: FC<Props> = (props) => {
  const { user, isLoadingUser } = props;

  const { t } = useTranslation();
  const [editUser, setEditUser] = useState(false);

  return (
    <div className="p-16 border border-secondary-300 rounded-sm">
      <h2 className="mb-32">{t('pages:account.information')}</h2>

      {!user || isLoadingUser ? (
        <div className="width-100 layout-column layout-align-center-center">
          <Loader size="md" />
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
