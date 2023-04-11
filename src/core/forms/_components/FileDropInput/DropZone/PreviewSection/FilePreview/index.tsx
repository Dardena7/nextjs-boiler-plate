import { CancelTwoTone } from "@mui/icons-material";
import clsx from "clsx";
import { FC } from "react";
import Image from "next/image";
import styles from "../../FileDropInput.module.css";

type Props = {
  files: File[];
  onChange: (files: File[]) => void;
  preview: string;
  fileIndex: number;
};

export const FilePreview: FC<Props> = (props) => {
  const { files, fileIndex, onChange, preview } = props;

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
        onClick={() => {
          const updatedFiles = [
            ...files.slice(0, fileIndex),
            ...files.slice(fileIndex + 1),
          ];
          onChange(updatedFiles);
        }}
      >
        <CancelTwoTone
          className="text-danger-500 cursor-pointer"
          style={{ fontSize: "16px" }}
        />
        {/* $$alex ts */}
        <span className="ml-4 text-danger-500">Remove</span>
      </div>
      <Image
        style={{ display: "block" }}
        width={"160"}
        height={"120"}
        src={preview}
        onLoad={() => {
          URL.revokeObjectURL(preview);
        }}
        alt={`preview-${fileIndex}`}
      />
    </div>
  );
};
