import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Box, MenuItem } from '@mui/material';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ExpenseInputComponent = ({ budgets, expenses, setExpenses}) => {
    const [expenseCategory, setExpenseCategory] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [expenseDescription, setExpenseDescription] = useState(''); // New state variable for description
    

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    const handleDeleteExpense = (index) => {
        const newExpenses = [...expenses];
        newExpenses.splice(index, 1);
        setExpenses(newExpenses);
    };

    const handleEditExpense = (index) => {
        const expenseToEdit = expenses[index];
        setExpenseCategory(expenseToEdit.category);
        setExpenseAmount(expenseToEdit.amount);
        setExpenseDate(expenseToEdit.date);
        setExpenseDescription(expenseToEdit.description);
        handleDeleteExpense(index);
    };

    const handleAddExpense = (event) => {
        event.preventDefault(); // Prevent form from refreshing the page on submit
        if (!expenseCategory  || !expenseDate || !expenseDescription) {
            alert('Please fill in all fields correctly');
            return;
        }

        const newExpense = {
            category: expenseCategory,
            amount: expenseAmount,
            date: expenseDate,
            description: expenseDescription // Include description in the new expense
        };
        setExpenses([...expenses, newExpense]);
        setExpenseCategory('');
        setExpenseAmount('');
        setExpenseDate('');
        setExpenseDescription(''); // Reset description input
    };

    return (
        <div>
            <h2>Add Expense</h2>
            <form onSubmit={handleAddExpense}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" gap={2}>
                        <TextField
                            select
                            label="Category"
                            value={expenseCategory}
                            onChange={(e) => setExpenseCategory(e.target.value)}
                            helperText="Please select the category"
                        >
                            {budgets.map((budget, index) => (
                                <MenuItem key={index} value={budget.category}>
                                    {budget.category}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Amount"
                            value={expenseAmount}
                            onChange={(e) => setExpenseAmount(e.target.value)}
                            type="number"
                        />
                        <TextField
                            label="Date"
                            type="date"
                            value={expenseDate}
                            onChange={(e) => setExpenseDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Description"
                            value={expenseDescription}
                            onChange={(e) => setExpenseDescription(e.target.value)}
                            helperText="Please enter a description"
                        />
                    </Box>
                    <Button variant="outlined" color="primary" type="submit">
                        Add Expense
                    </Button>
                </Box>
            </form>
            {/* Expense List */}
            <List>
        {expenses.map((expense, index) => (
          <ListItem key={index}>
            <ListItemText primary={expense.category} secondary={`$${expense.amount} - ${expense.date} - ${expense.description}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteExpense(index)}>
                <DeleteIcon />
              </IconButton>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditExpense(index)}>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
        </div>
    );
};

export default ExpenseInputComponent;