import { Session } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { UserRole } from './types/generic';

const rolesPath = process.env.NEXT_PUBLIC_ROLES_PATH as string;
const ADMIN_ROLES = ['superadmin', 'admin'];

export const checkPageAuthorization = async (
  session: Session | null | undefined,
  acceptedRoles: string[]
) => {
  const userRoles: UserRole[] = session?.user?.[rolesPath] || [];
  return userRoles.some((role) => acceptedRoles.includes(role));
};

export const redirectToErrorPage = () => {
  return {
    redirect: {
      permanent: false,
      destination: '/error',
    },
  };
};

export const checkTokenTimestamp = (timestamp?: number) => {
  if (!timestamp) return false;

  const now = new Date();
  const oneHourLater = now.getTime() + 3600000;
  return timestamp > Math.floor(oneHourLater / 1000);
};

export const checkSessionValid = (session?: Session | null) => {
  if (!session) return false;
  return checkTokenTimestamp(session.accessTokenExpiresAt);
};

export const redirectToLoginPage = () => {
  return {
    redirect: {
      permanent: false,
      destination: '/api/auth/login',
    },
  };
};

export const checkIsAdmin = (user?: UserProfile) => {
  const roles = (user?.[rolesPath] || []) as UserRole[];
  return roles.some((role) => ADMIN_ROLES.includes(role));
};
