import { Button } from "@/core/components/Button";
import { User } from "@/core/repos/types/generic";
import { TextField } from "@mui/material";
import clsx from "clsx";
import { FC } from "react";

type Props = {
  user: User;
  setEditUser: (v: boolean) => void;
  className?: string;
};

export const ShowUserInformation: FC<Props> = (props) => {
  const { user, setEditUser, className } = props;
  return (
    <div className={clsx(className)}>
      <div>
        <div className="text-secondary-700 mb-16">
          <p className="bold mb-4">Firstame</p>
          <p>{user?.firstname}</p>
        </div>
        <div className="text-secondary-700 mb-16">
          <p className="bold mb-4">Lastame</p>
          <p>{user?.lastname}</p>
        </div>
        <div className="text-secondary-700">
          <p className="bold mb-4">Email</p>
          <p>{user?.email}</p>
        </div>
      </div>
      <div className="mt-32 layout-row layout-align-end">
        <Button
          label="Edit my information"
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
