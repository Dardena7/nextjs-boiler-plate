import { useUserProfile } from '@/core/hooks/use-user-profile';
import { UserInformation } from './UserInformation';
import { useTranslation } from 'next-i18next';

export const Account = () => {
  const { userProfile, isLoading: isLoadingUser } = useUserProfile();
  const { t } = useTranslation();

  return (
    <div className="py-32 container-lg border-secondary-300">
      <h1 className="mb-32 text-center">{t('pages:account.title')}</h1>
      <UserInformation user={userProfile} isLoadingUser={isLoadingUser} />
    </div>
  );
};
