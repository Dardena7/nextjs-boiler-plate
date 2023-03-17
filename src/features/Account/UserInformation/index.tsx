import { Loader } from "@/core/components/Loader";
import { User } from "@/core/repos/types/generic";
import { FC, useState } from "react";
import { EditUserInformation } from "./EditUserInformation";
import { ShowUserInformation } from "./ShowUserInformation";

type Props = {
  user?: User;
  isLoadingUser?: boolean;
};

export const UserInformation: FC<Props> = (props) => {
  const { user, isLoadingUser } = props;

  const [editUser, setEditUser] = useState(false);

  return (
    <div className="p-16 border border-secondary-300 rounded-sm">
      <h2 className="mb-32">Information</h2>

      {!user || isLoadingUser ? (
        <div className="width-100 layout-column layout-align-center-center">
          <Loader size="md" />
        </div>
      ) : (
        <>
          {editUser ? (
            <EditUserInformation user={user} setEditUser={setEditUser} />
          ) : (
            <ShowUserInformation user={user} setEditUser={setEditUser} />
          )}
        </>
      )}
    </div>
  );
};
