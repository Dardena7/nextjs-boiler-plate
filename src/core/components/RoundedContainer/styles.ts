import styled from '@emotion/styled';

type Props = {
  size: number;
};

export const RoundedContainer = styled.div<Props>`
  height: ${({ size }) => size}rem;
  width: ${({ size }) => size}rem;
`;
