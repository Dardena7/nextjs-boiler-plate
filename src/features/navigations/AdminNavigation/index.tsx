import { useUser } from "@auth0/nextjs-auth0/client";
import { MenuItem, Select } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { localeRedirect } from "../utils";

export const AdminNavigation = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const router = useRouter();

  const { locales, locale } = router;

  return (
    <nav className="p-16 layout-row layout-align-space-between border-bottom border-2 border-secondary-300 text-secondary-900">
      <ul className="layout-row layout-align-start-center">
        <li>
          <Link href={"/"}>{t("pages:home.title")}</Link>
        </li>
        <li className="ml-16">
          <Link href={"/admin"}>{t("pages:admin.title")}</Link>
        </li>
        <li className="ml-16">
          <Link href={"/admin/products"}>
            {t("pages:manageProducts.title")}
          </Link>
        </li>
        <li className="ml-16">
          <Link href={"/admin/users"}>{t("pages:manageUsers.title")}</Link>
        </li>
      </ul>
      <ul className="layout-row layout-align-end-center">
        <>
          <li className="mr-16">
            <Link href={"/account"}>{t("pages:account.title")}</Link>
          </li>
          <li>
            <Link href={"/api/auth/logout"}>{t("common:logOut")}</Link>
          </li>
        </>
        <li className="ml-16">
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
