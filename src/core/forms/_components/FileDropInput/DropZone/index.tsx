import clsx from "clsx";
import { FC } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import styles from "./FileDropInput.module.css";
import { PreviewSection } from "./PreviewSection";

type Props = {
  files: File[];
  onChange: (v: any[]) => void;
  className?: string;
};

export const DropZone: FC<Props> = (props) => {
  const { files, onChange, className } = props;

  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length) return;

    const allFiles = [...files, ...acceptedFiles];
    onChange(allFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 2000000, //2MB
    onDrop,
  });

  return (
    <div className={clsx(className)}>
      <div
        className={clsx(
          styles.filedrop,
          "py-64 bg-secondary-100 rounded-lg border border-secondary-300 cursor-pointer"
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-center">
            {/* $$alex ts */}
            Drop the files here ...
          </p>
        ) : (
          <p className="text-center">
            {/* $$alex ts */}
            Drag & drop some files here, or click to select files
          </p>
        )}
      </div>

      {!!files.length ? (
        <PreviewSection className="mt-16" files={files} onChange={onChange} />
      ) : null}
    </div>
  );
};
