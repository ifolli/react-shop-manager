import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header links', () => {
  render(<App />);
  expect(screen.getByText(/Shop Management App/i)).toBeInTheDocument();
  expect(screen.getByText(/View all items/i)).toBeInTheDocument();
  expect(screen.getByText(/Add item/i)).toBeInTheDocument();
});
