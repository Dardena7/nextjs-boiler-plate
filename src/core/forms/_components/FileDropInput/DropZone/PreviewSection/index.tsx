import clsx from "clsx";
import { FC } from "react";
import { FileWrapper } from "../../../FileWrapper";
import Image from "next/image";

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
            <FileWrapper
              key={`image-preview-${index}`}
              onRemove={() => {
                const updatedFiles = [
                  ...files.slice(0, index),
                  ...files.slice(index + 1),
                ];
                onChange(updatedFiles);
              }}
            >
              <Image
                width="160"
                height="120"
                src={preview}
                onLoad={() => URL.revokeObjectURL(preview)}
                alt={`image-preview-${index}`}
              />
            </FileWrapper>
          );
        })}
      </div>
    </div>
  );
};
