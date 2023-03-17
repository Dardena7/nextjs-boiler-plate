import {
  getAccessToken,
  getSession,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Navigation } from "@/core/components/Navigation";
import { Account } from "@/features/Account";
import { checkSessionValid, redirectToLoginPage } from "@/core/authorizations";

type Props = {
  isLogged: boolean;
};

export default function AccountPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isLogged } = props;

  return (
    <>
      <Navigation isLogged={isLogged} />
      <Account />
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

      return { props: { isLogged } };
    },
  });
