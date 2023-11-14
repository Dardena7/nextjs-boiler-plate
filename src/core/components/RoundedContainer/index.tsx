import { FC, ReactElement } from 'react';
import clsx from 'clsx';

import * as S from './styles';

type Props = {
  size: number;
  className?: string;
  children?: ReactElement | string;
};

export const RoundedContainer: FC<Props> = (props) => {
  const { size, className, children } = props;
  return (
    <S.RoundedContainer
      size={size}
      className={clsx(
        className,
        'layout-column layout-align-center-center rounded'
      )}
      data-testid="rounded-container"
    >
      {children}
    </S.RoundedContainer>
  );
};
