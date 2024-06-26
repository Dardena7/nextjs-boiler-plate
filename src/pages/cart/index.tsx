import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { GetServerSideProps } from 'next';
import { UserNavigation } from '@/features/navigations/UserNavigation';
import { Cart } from '@/features/Cart';

export default function CartPage() {
  return (
    <>
      <UserNavigation />
      <Cart />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'pages'])),
    },
  };
};
