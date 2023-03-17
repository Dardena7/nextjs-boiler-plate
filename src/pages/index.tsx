import { checkSessionValid } from "@/core/authorizations";
import { Navigation } from "@/core/components/Navigation";
import { getSession } from "@auth0/nextjs-auth0";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";

type Props = {
  isLogged: boolean;
};

export default function HomePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isLogged } = props;

  return (
    <>
      <Navigation isLogged={isLogged} />
      <main>
        <h1>Home Page</h1>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = await getSession(ctx.req, ctx.res);
  const isLogged = checkSessionValid(session);

  return { props: { isLogged } };
};
