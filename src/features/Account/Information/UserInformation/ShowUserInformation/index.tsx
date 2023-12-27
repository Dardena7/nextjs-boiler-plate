import { Button } from '@/core/components/Button';
import { User } from '@/core/types/generic';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { Edit } from '@mui/icons-material';

type Props = {
  user: User;
  setEditUser: (v: boolean) => void;
  className?: string;
};

export const ShowUserInformation: FC<Props> = (props) => {
  const { user, setEditUser, className } = props;
  const { t } = useTranslation();

  return (
    <div className={clsx(className)}>
      <div>
        <div className="text-secondary-700 mb-8">
          <p className="bold mb-4">{t('pages:account.firstname')}</p>
          <p>{user?.firstname || '-'}</p>
        </div>
        <div className="text-secondary-700 mb-8">
          <p className="bold mb-4">{t('pages:account.lastname')}</p>
          <p>{user?.lastname || '-'}</p>
        </div>
        <div className="text-secondary-700">
          <p className="bold mb-4">{t('pages:account.emailAdress')}</p>
          <p>{user?.email}</p>
        </div>
      </div>
      <div className="mt-16 layout-row layout-align-end">
        <Button
          label={
            <div className="layout-row layout-align-start-center">
              <Edit fontSize="small" />
              {/* $$alex trans */}
              <span className="ml-8">{t('pages:account.editMyInfo')}</span>
            </div>
          }
          style="primary"
          variant="outlined"
          size="sm"
          onClick={() => {
            setEditUser(true);
          }}
        />
      </div>
    </div>
  );
};
