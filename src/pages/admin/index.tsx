import {
  checkPageAuthorization,
  redirectToErrorPage,
} from "@/core/authorization";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { NextPage } from "next";

const Admin: NextPage = () => {
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
