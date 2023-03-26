import { Button } from "@/core/components/Button";
import { User } from "@/core/repos/types/generic";
import clsx from "clsx";
import { FC } from "react";
import { useTranslation } from "next-i18next";

type Props = {
  user: User;
  setEditUser: (v: boolean) => void;
  className?: string;
};

export const ShowUserInformation: FC<Props> = (props) => {
  const { user, setEditUser, className } = props;
  const { t } = useTranslation();

  return (
    <div className={clsx(className)}>
      <div>
        <div className="text-secondary-700 mb-16">
          <p className="bold mb-4">{t("pages:account.firstname")}</p>
          <p>{user?.firstname}</p>
        </div>
        <div className="text-secondary-700 mb-16">
          <p className="bold mb-4">{t("pages:account.lastname")}</p>
          <p>{user?.lastname}</p>
        </div>
        <div className="text-secondary-700">
          <p className="bold mb-4">{t("pages:account.emailAdress")}</p>
          <p>{user?.email}</p>
        </div>
      </div>
      <div className="mt-32 layout-row layout-align-end">
        <Button
          label={t("pages:account.editMyInfo")}
          style="primary"
          variant="raised"
          size="sm"
          onClick={() => {
            setEditUser(true);
          }}
        />
      </div>
    </div>
  );
};
