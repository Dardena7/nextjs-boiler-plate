import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { GetServerSideProps } from 'next';
import { UserNavigation } from '@/features/navigations/UserNavigation';
import { Home } from '@/features/Home';

type Props = {};

export default function HomePage() {
  return (
    <>
      <UserNavigation />
      <Home />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'pages'])),
    },
  };
};
