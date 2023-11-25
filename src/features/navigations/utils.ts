import { NextRouter } from 'next/router';

export const localeRedirect = (router: NextRouter, locale: string) => {
  window.location.href = `/${locale}/${router.asPath}`;
};
