import { useUserProfile } from '@/core/hooks/use-user-profile';
import { UserInformation } from './UserInformation';
import { useTranslation } from 'next-i18next';
import { UserAddresses } from './UserAddresses';

export const Information = () => {
  const { userProfile, isLoading: isLoadingUser } = useUserProfile();
  const { t } = useTranslation();

  return (
    <div className="py-32 container-lg border-secondary-300">
      {/* $$alex ts */}
      <h1 className="mb-32 text-center">Information</h1>
      <UserInformation
        className="mb-32"
        user={userProfile}
        isLoadingUser={isLoadingUser}
      />
      <UserAddresses user={userProfile} isLoadingUser={isLoadingUser} />
    </div>
  );
};
