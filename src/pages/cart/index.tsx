import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { GetServerSideProps } from 'next';
import { UserNavigation } from '@/features/navigations/UserNavigation';
import { Cart } from '@/features/Cart';
import { useUserProfile } from '@/core/hooks/use-user-profile';
import { CartGuest } from '@/features/CartGuest';

export default function CartPage() {
  const { oauthUser } = useUserProfile();
  return (
    <>
      <UserNavigation />
      {oauthUser ? <Cart /> : <CartGuest />}
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
