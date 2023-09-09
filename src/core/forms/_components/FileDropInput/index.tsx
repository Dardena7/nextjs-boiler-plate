import clsx from 'clsx';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DropZone } from './DropZone';

type Props = {
  name: string;
  className?: string;
  dropzoneStyle?: string;
  showPreview?: boolean;
};

export const FileDropInput: FC<Props> = (props) => {
  const { name, className, dropzoneStyle, showPreview } = props;

  const { control } = useFormContext();

  return (
    <div className={clsx(className)}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <DropZone
              showPreview={showPreview}
              dropzoneStyle={dropzoneStyle}
              files={value || []}
              onChange={onChange}
            />
          );
        }}
      />
    </div>
  );
};
