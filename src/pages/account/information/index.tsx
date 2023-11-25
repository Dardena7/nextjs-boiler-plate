import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

import { checkSessionValid, redirectToLoginPage } from '@/core/authorizations';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { UserNavigation } from '@/features/navigations/UserNavigation';
import { Information } from '@/features/Account/Information';

export default function AccountInformationPage() {
  return (
    <>
      <UserNavigation />
      <Information />
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
        ...(await serverSideTranslations(locale || 'en', ['common', 'pages'])),
      },
    };
  },
});
