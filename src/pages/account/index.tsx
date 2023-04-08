import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

import { Account } from "@/features/Account";
import { checkSessionValid, redirectToLoginPage } from "@/core/authorizations";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { UserNavigation } from "@/features/navigations/UserNavigation";

export default function AccountPage() {
  return (
    <>
      <UserNavigation />
      <Account />
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);

    const isLogged = checkSessionValid(session);
    if (!isLogged) {
      return redirectToLoginPage();
    }

    const { locale } = ctx;

    return {
      props: {
        ...(await serverSideTranslations(locale || "en", ["common", "pages"])),
      },
    };
  },
});
