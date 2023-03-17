import { useUserProfile } from "@/core/hooks/user-user-profile";
import { UserInformation } from "./UserInformation";

export const Account = () => {
  const { userProfile, isLoading: isLoadingUser } = useUserProfile();

  return (
    <div className="py-32 container-lg border-secondary-300">
      <h1 className="mb-32 text-center">Account Page</h1>
      <UserInformation user={userProfile} isLoadingUser={isLoadingUser} />
    </div>
  );
};
