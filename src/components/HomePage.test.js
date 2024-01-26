import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

test('renders Add Expenses section', () => {
  render(<HomePage />);
  const addExpensesSection = screen.getByText(/Add Expenses/i);
  expect(addExpensesSection).toBeInTheDocument();
});

test('renders Transaction History section', () => {
  render(<HomePage />);
  const transactionHistorySection = screen.getByText(/Transaction History/i);
  expect(transactionHistorySection).toBeInTheDocument();
});

test('renders Budget section', () => {
  render(<HomePage />);
  const budgetSection = screen.getByText(/Budget/i);
  expect(budgetSection).toBeInTheDocument();
});

test('renders Budget Tracker section', () => {
  render(<HomePage />);
  const budgetTrackerSection = screen.getByText(/Budget Tracker/i);
  expect(budgetTrackerSection).toBeInTheDocument();
});

test('renders Goals section', () => {
  render(<HomePage />);
  const goalsSection = screen.getByText(/Goals/i);
  expect(goalsSection).toBeInTheDocument();
});