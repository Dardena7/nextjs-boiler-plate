import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { NextPage } from "next";

import {
  checkPageAuthorization,
  redirectToErrorPage,
} from "@/core/authorizations";
import { useGetUsers } from "@/core/repos/users";
import { useGetRoles } from "@/core/repos/management";

const Admin: NextPage = () => {
  const { data: users } = useGetUsers();
  const { data: roles } = useGetRoles();

  return (
    <main>
      <h1>Admin Page</h1>
    </main>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const isAuthorized = await checkPageAuthorization(ctx, [
      "superadmin",
      "admin",
    ]);

    if (!isAuthorized) return redirectToErrorPage();
    return { props: {} };
  },
});

export default Admin;
