import { Navigation } from "@/core/components/Navigation";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { GetServerSideProps } from "next";

type Props = {};

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <h1>Home Page</h1>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale || "en", ["common", "pages"])),
    },
  };
};
