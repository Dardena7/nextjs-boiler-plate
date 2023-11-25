import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

import { checkSessionValid, redirectToLoginPage } from '@/core/authorizations';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { UserNavigation } from '@/features/navigations/UserNavigation';
import { Order } from '@/features/Account/Orders/Order';

type Props = {
  orderId: number;
};

export default function OrderPage(props: Props) {
  const { orderId } = props;

  return (
    <>
      <UserNavigation />
      <Order orderId={orderId} />
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

    const { locale, query } = ctx;
    const orderId = parseInt(query.orderId as string, 10);

    return {
      props: {
        orderId,
        ...(await serverSideTranslations(locale || 'en', ['common', 'pages'])),
      },
    };
  },
});
