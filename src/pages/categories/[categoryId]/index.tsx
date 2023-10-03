import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { GetServerSideProps } from 'next';
import { UserNavigation } from '@/features/navigations/UserNavigation';
import { Category } from '@/features/Category';

export default function ManageProductPage() {
  return (
    <>
      <UserNavigation />
      <Category />
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
