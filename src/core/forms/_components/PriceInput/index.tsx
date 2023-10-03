import clsx from 'clsx';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import * as S from './styles';

type Props = {
  name: string;
  label: string;
  className?: string;
};

export const PriceInput: FC<Props> = (props) => {
  const { name, label, className } = props;
  const { control } = useFormContext();

  return (
    <div className={clsx(className)}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <S.PriceInput
              label={label}
              type="number"
              variant="outlined"
              onChange={(event) => onChange(event.currentTarget.value)}
              value={value}
              size="small"
              required={true}
              error={!!error}
              fullWidth={true}
              inputProps={{ step: '0.01' }}
            />
          );
        }}
      />
    </div>
  );
};
