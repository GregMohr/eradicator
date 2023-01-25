import { render, screen } from '@testing-library/react';
import App from './App';
import Dashboard from './pages/Dashboard/Dashboard';

test('renders dashboard', () => {
  render(<App />);
  // const dash = render(<Dashboard />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  // 
  // expect(Dashboard).toBeInTheDocument()
});
