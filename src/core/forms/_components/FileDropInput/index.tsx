import clsx from "clsx";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DropZone } from "./DropZone";

type Props = {
  name: string;
  className?: string;
};

export const FileDropInput: FC<Props> = (props) => {
  const { name, className } = props;

  const { control } = useFormContext();

  return (
    <div className={clsx(className)}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return <DropZone files={value || []} onChange={onChange} />;
        }}
      />
    </div>
  );
};
