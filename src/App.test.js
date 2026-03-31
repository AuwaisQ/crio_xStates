import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Select Location heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Select Location/i);
  expect(headingElement).toBeInTheDocument();
});
