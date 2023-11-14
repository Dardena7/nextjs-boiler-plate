import { useUser } from '@auth0/nextjs-auth0/client';
import { MenuItem, Select } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { localeRedirect } from '../utils';
import { useGetCart } from '@/core/repos/carts';
import { useMemo } from 'react';
import {
  AdminPanelSettingsTwoTone,
  HomeTwoTone,
  LoginTwoTone,
  LogoutTwoTone,
  PersonTwoTone,
  ShoppingCartTwoTone,
} from '@mui/icons-material';
import { getCartItemsCount } from './utils';
import { checkIsAdmin } from '@/core/authorizations';
import { RoundedContainer } from '@/core/components/RoundedContainer';

export const UserNavigation = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const router = useRouter();

  const { locales, locale } = router;

  const { data: cart } = useGetCart();

  const cartItemsCount = useMemo(() => getCartItemsCount(cart), [cart]);

  const isAdmin = checkIsAdmin(user);

  return (
    <nav
      className="p-16 layout-row layout-align-space-between border-bottom border-2 border-secondary-300 text-secondary-900 bg-neutral-100"
      style={{ position: 'sticky', top: 0, zIndex: 1000 }}
    >
      <ul className="layout-row layout-align-start-center">
        <li className="mr-16">
          <Link href={'/'} className="layout-row layout-align-start-center">
            <HomeTwoTone className="mr-4" fontSize="small" />
            <span>{t('pages:home.title')}</span>
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link
              href={'/admin'}
              className="layout-row layout-align-start-center"
            >
              <AdminPanelSettingsTwoTone className="mr-4" fontSize="small" />
              <span>{t('pages:admin.title')}</span>
            </Link>
          </li>
        )}
      </ul>
      <ul className="layout-row layout-align-end-center">
        <li className="mr-16">
          {/* $$alex ts */}
          <Link href={'/cart'} className="layout-row layout-align-start-center">
            <ShoppingCartTwoTone className="mr-4" fontSize="small" />
            <span>Cart</span>
            {!!cartItemsCount && (
              <RoundedContainer
                className={'ml-4 bg-secondary-700 text-neutral-100'}
                size={1.125}
              >
                <span style={{ fontSize: '0.6rem' }}>
                  {cartItemsCount.toString()}
                </span>
              </RoundedContainer>
            )}
          </Link>
        </li>

        {!!user ? (
          <>
            <li className="mr-16">
              <Link
                href={'/account'}
                className="layout-row layout-align-start-center"
              >
                <PersonTwoTone className="mr-4" fontSize="small" />
                <span>{t('pages:account.title')}</span>
              </Link>
            </li>
            <li className="mr-16">
              <Link
                href={'/api/auth/logout'}
                className="layout-row layout-align-start-center"
              >
                <LogoutTwoTone className="mr-4" fontSize="small" />
                <span>{t('common:logOut')}</span>
              </Link>
            </li>
          </>
        ) : (
          <li className="mr-16">
            <Link
              href={'/api/auth/login'}
              className="layout-row layout-align-start-center"
            >
              <LoginTwoTone className="mr-4" fontSize="small" />
              <span>{t('common:logIn')}</span>
            </Link>
          </li>
        )}
        <li>
          <Select
            variant="standard"
            size="small"
            value={locale}
            onChange={(ev) => localeRedirect(router, ev.target.value)}
          >
            {locales?.map((l) => {
              return (
                <MenuItem key={`locale-${l}`} value={l}>
                  {l.toLocaleUpperCase()}
                </MenuItem>
              );
            })}
          </Select>
        </li>
      </ul>
    </nav>
  );
};
