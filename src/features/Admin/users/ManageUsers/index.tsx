import { useGetRoles } from "@/core/repos/management";
import { User } from "@/core/repos/types/generic";
import { useGetUsers } from "@/core/repos/users";
import { useTranslation } from "next-i18next";

export const ManageUsers = () => {
  const { data: users } = useGetUsers();
  const { data: roles } = useGetRoles();

  const { t } = useTranslation();

  return (
    <div>
      <h1 className="my-32 text-center">{t("pages:manageUsers.title")}</h1>
      <div className="container-md">
        <ul>
          {users?.map((user: User, index: number) => {
            return (
              <li key={`user-${index}`}>
                {`${user.email} ${user.firstname} ${user.lastname}`}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
