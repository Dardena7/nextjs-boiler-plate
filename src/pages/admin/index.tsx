import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import {
  checkPageAuthorization,
  checkSessionValid,
  redirectToErrorPage,
  redirectToLoginPage,
} from "@/core/authorizations";

import { Admin } from "@/features/Admin";
import { Navigation } from "@/core/components/Navigation";

type Props = {
  isLogged: boolean;
};

export default function AdminPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isLogged } = props;

  return (
    <>
      <Navigation isLogged={isLogged} />
      <Admin />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> =
  withPageAuthRequired({
    async getServerSideProps(ctx) {
      const session = await getSession(ctx.req, ctx.res);

      const isLogged = checkSessionValid(session);
      if (!isLogged) {
        return redirectToLoginPage();
      }

      const isAuthorized = await checkPageAuthorization(session, [
        "superadmin",
        "admin",
      ]);

      if (!isAuthorized) return redirectToErrorPage();

      return { props: { isLogged } };
    },
  });
