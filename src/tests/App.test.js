import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Header', () => {
  it('Should render the logo', () => {
    render(<App />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('Should render the main heading', () => {
    render(<App />);
    expect(screen.getByText(/currency exchange/i)).toBeInTheDocument();
  });
});
