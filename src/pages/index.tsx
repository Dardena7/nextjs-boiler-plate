import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { GetServerSideProps } from 'next';
import { useGetProducts } from '@/core/repos/products';
import { UserNavigation } from '@/features/navigations/UserNavigation';

type Props = {};

export default function HomePage() {
  const { data: products } = useGetProducts();

  return (
    <>
      <UserNavigation />
      <main>
        <h1>Home Page</h1>
        <ul>
          {products?.map((p, index) => {
            return <p key={p.id}>{p.name}</p>;
          })}
        </ul>
      </main>
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
