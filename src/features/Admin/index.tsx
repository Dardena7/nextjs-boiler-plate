import Link from "next/link";
import { useTranslation } from "next-i18next";

export const Admin = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="my-32 text-center">{t("pages:admin.title")}</h1>
      <div className="container-md">
        <Link href={"/admin/users"}>
          <div className="mb-8 rounded-sm shadow-1 p-32 bg-secondary-200">
            <p className="bold text-center">{t("pages:manageUsers.title")}</p>
          </div>
        </Link>
        <Link href={"/admin/products"}>
          <div className="p-32 rounded-sm shadow-1 bg-secondary-200">
            <p className="bold text-center">
              {t("pages:manageProducts.title")}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
