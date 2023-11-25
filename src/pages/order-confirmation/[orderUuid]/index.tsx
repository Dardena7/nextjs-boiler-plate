import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { UserNavigation } from '@/features/navigations/UserNavigation';
import { GetServerSideProps } from 'next';
import { OrderConfirmation } from '@/features/OrderConfirmation';

type Props = {
  orderUuid: string;
};

export default function AccountPage(props: Props) {
  const { orderUuid } = props;

  return (
    <>
      <UserNavigation />
      <OrderConfirmation orderUuid={orderUuid} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      orderUuid: ctx.query.orderUuid,
      ...(await serverSideTranslations(locale || 'en', ['common', 'pages'])),
    },
  };
};
