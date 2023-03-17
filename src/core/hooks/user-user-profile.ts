import { useUser as useAuth0User } from "@auth0/nextjs-auth0/client";


import { useGetUser } from "../repos/users";

export const useUserProfile = () => {
  const { user: oauthUser, isLoading: isLoadingUser } = useAuth0User();
  const { data: userProfile, isLoading: isLoadingUserProfile, isRefetching } = useGetUser(oauthUser?.sub as string, !!oauthUser);

  return { userProfile, oauthUser, isLoading: isLoadingUser || isLoadingUserProfile || isRefetching };
};