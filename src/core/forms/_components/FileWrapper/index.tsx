import { CancelTwoTone } from "@mui/icons-material";
import clsx from "clsx";
import { FC, ReactElement } from "react";
import styles from "./FileWrapper.module.css";

type Props = {
  children: ReactElement;
  onRemove: () => void;
};

export const FileWrapper: FC<Props> = (props) => {
  const { children, onRemove } = props;

  return (
    <div
      className="m-4 display-inline-block rounded-md border border-secondary-300 shadow-3"
      style={{ overflow: "hidden" }}
    >
      <div
        className={clsx(
          styles["remove-file"],
          "layout-row layout-align-center-center p-4 bg-danger-200 cursor-pointer"
        )}
        onClick={onRemove}
      >
        <CancelTwoTone
          className="text-danger-500 cursor-pointer"
          style={{ fontSize: "16px" }}
        />
        {/* $$alex ts */}
        <span className="ml-4 text-danger-500">Remove</span>
      </div>
      {children}
    </div>
  );
};
