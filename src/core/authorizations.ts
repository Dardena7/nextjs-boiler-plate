import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

const ROLES_PATH = "https:nextApp/roles";

export const checkPageAuthorization = async (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, acceptedRoles: string[]) => {
  const session = await getSession(ctx.req, ctx.res);
  const userRoles: string[] = session?.user?.[ROLES_PATH];
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