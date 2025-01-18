import { Button } from './';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Button test', () => {
  it('should render Button', () => {
    render(
      <Button
        label={'Custom Label'}
        style={'primary'}
        variant={'raised'}
        size={'xs'}
      />
    );

    expect(screen.queryByTestId('button-component')).toBeInTheDocument();
    expect(screen.queryByText('Custom Label')).toBeInTheDocument();
  });
});
