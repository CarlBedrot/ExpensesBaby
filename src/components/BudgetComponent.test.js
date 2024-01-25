import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BudgetComponent from './BudgetComponent';

test('renders BudgetComponent', () => {
  render(<BudgetComponent budgets={[]} setBudgets={() => {}} />);
  const headerElement = screen.getByText(/Budget Creation/i);
  expect(headerElement).toBeInTheDocument();
});

test('adds budget', () => {
  const setBudgetsMock = jest.fn();
  render(<BudgetComponent budgets={[]} setBudgets={setBudgetsMock} />);
  const categoryInput = screen.getByLabelText(/Category/i);
  const amountInput = screen.getByLabelText(/Amount/i);
  const addButton = screen.getByText(/Add category to Budget/i);

  fireEvent.change(categoryInput, { target: { value: 'Food' } });
  fireEvent.change(amountInput, { target: { value: '100' } });
  fireEvent.click(addButton);

  expect(setBudgetsMock).toHaveBeenCalledWith([{ category: 'Food', amount: '100' }]);
});

test('edits budget', () => {
  const setBudgetsMock = jest.fn();
  render(
    <BudgetComponent
      budgets={[{ category: 'Food', amount: '100' }]}
      setBudgets={setBudgetsMock}
    />
  );
  const editButton = screen.getByText(/Edit/i);

  fireEvent.click(editButton);

  const categoryInput = screen.getByLabelText(/Category/i);
  const amountInput = screen.getByLabelText(/Amount/i);
  const updateButton = screen.getByText(/Update Budget/i);

  fireEvent.change(categoryInput, { target: { value: 'Transportation' } });
  fireEvent.change(amountInput, { target: { value: '50' } });
  fireEvent.click(updateButton);

  expect(setBudgetsMock).toHaveBeenCalledWith([{ category: 'Transportation', amount: '50' }]);
});

test('deletes budget', () => {
  const setBudgetsMock = jest.fn();
  render(
    <BudgetComponent
      budgets={[{ category: 'Food', amount: '100' }]}
      setBudgets={setBudgetsMock}
    />
  );
  const deleteButton = screen.getByText(/Delete/i);

  fireEvent.click(deleteButton);

  expect(setBudgetsMock).toHaveBeenCalledWith([]);
});