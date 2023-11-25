import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export const Account = () => {
  const { t } = useTranslation();

  return (
    <div className="py-32 container-lg border-secondary-300">
      <h1 className="mb-32 text-center">{t('pages:account.title')}</h1>
      {/* $$alex ts */}
      <Link href={'/account/information'}>
        <div className="mb-8 rounded-sm shadow-1 p-32 bg-secondary-200">
          <p className="bold text-center">Information</p>
        </div>
      </Link>
      {/* $$alex ts */}
      <Link href={'/account/orders'}>
        <div className="mb-8 rounded-sm shadow-1 p-32 bg-secondary-200">
          <p className="bold text-center">Orders</p>
        </div>
      </Link>
    </div>
  );
};
