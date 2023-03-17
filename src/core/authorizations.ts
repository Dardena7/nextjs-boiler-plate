import { Session } from "@auth0/nextjs-auth0";

const ROLES_PATH = "https:nextApp/roles";

export const checkPageAuthorization = async (session: Session | null | undefined, acceptedRoles: string[]) => {
  const userRoles: string[] = session?.user?.[ROLES_PATH] || [];
  return userRoles.some(role => acceptedRoles.includes(role))
}

export const redirectToErrorPage = () => {
  return {
    redirect: {
      permanent: false,
      destination: "/error",
    },
  };
}

export const checkTokenTimestamp = (timestamp?: number) => {
  if (!timestamp) return false;

  const now = new Date();
  const oneHourLater = now.getTime() + 3600000;
  return timestamp > Math.floor(oneHourLater / 1000);
}

export const checkSessionValid = (session?: Session | null) => {
  if (!session) return false;
  return checkTokenTimestamp(session.accessTokenExpiresAt)
}

export const redirectToLoginPage = () => {
  return {
    redirect: {
      permanent: false,
      destination: "/api/auth/login",
    },
  };
}