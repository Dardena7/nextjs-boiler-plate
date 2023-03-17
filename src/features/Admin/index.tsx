import { useGetRoles } from "@/core/repos/management";
import { User } from "@/core/repos/types/generic";
import { useGetUsers } from "@/core/repos/users";

export const Admin = () => {
  const { data: users } = useGetUsers();
  const { data: roles } = useGetRoles();

  return (
    <div>
      <h1>Admin Page</h1>
      <ul>
        {users?.map((user: User, index: number) => {
          return (
            <li key={`user-${index}`}>
              {`${user.firstname} ${user.lastname}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
