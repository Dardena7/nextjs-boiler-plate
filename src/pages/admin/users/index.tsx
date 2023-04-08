import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import {
  checkPageAuthorization,
  checkSessionValid,
  redirectToErrorPage,
  redirectToLoginPage,
} from "@/core/authorizations";

import { ManageUsers } from "@/features/Admin/users/ManageUsers";
import { AdminNavigation } from "@/features/navigations/AdminNavigation";

export default function ManageUsersPage() {
  return (
    <>
      <AdminNavigation />
      <ManageUsers />
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

    const isAuthorized = await checkPageAuthorization(session, [
      "superadmin",
      "admin",
    ]);

    if (!isAuthorized) return redirectToErrorPage();

    const { locale } = ctx;

    return {
      props: {
        ...(await serverSideTranslations(locale || "en", ["common", "pages"])),
      },
    };
  },
});
