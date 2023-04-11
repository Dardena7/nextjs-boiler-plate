import clsx from "clsx";
import { FC } from "react";
import { FilePreview } from "./FilePreview";

type Props = {
  files: File[];
  onChange: (files: File[]) => void;
  className?: string;
};

export const PreviewSection: FC<Props> = (props) => {
  const { files, onChange, className } = props;

  return (
    <div className={clsx(className)}>
      {/* $$alex ts */}
      <p className="bold">Preview: </p>
      <div className="mt-16 layout-wrap">
        {files.map((file, index) => {
          const preview = URL.createObjectURL(file);

          return (
            <FilePreview
              key={`image-${index}`}
              files={files}
              onChange={onChange}
              preview={preview}
              fileIndex={index}
            />
          );
        })}
      </div>
    </div>
  );
};
