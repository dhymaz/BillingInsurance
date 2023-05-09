import { render, screen } from '@testing-library/react';
import App from './App';
import Header from './Layouts/Header';

test('renders learn react link', () => {
  render(<Header />);
  const linkElement = screen.getByText("Insurance");
  expect(linkElement).toBeInTheDocument();
});
