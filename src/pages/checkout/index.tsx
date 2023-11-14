import { Checkout } from '@/features/Checkout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { UserNavigation } from '@/features/navigations/UserNavigation';
import { GetServerSideProps } from 'next';

export default function AccountPage() {
  return (
    <>
      <UserNavigation />
      <Checkout />
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
