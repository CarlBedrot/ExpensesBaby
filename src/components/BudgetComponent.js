import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Box, Select, MenuItem } from '@mui/material';

// hello world baby

/**
 * Represents a component for managing budgets.
 * @param {Object} props - The component props.
 * @param {Array} props.budgets - The list of budgets.
 * @param {Function} props.setBudgets - The function to update the list of budgets.
 * @returns {JSX.Element} The BudgetComponent JSX element.
 */

const currencies = ['SEK', 'USD', 'EUR', 'GBP', 'JPY'];


const BudgetComponent = ({ budgets, setBudgets }) => {
    const [category, setCategory] = useState(localStorage.getItem('category') || '');
    const [amount, setAmount] = useState(localStorage.getItem('amount') || '');
    const [selectedBudgetIndex, setSelectedBudgetIndex] = useState(null);
    const [categoryError, setCategoryError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'SEK');
    useEffect(() => {
        localStorage.setItem('currency', currency);
    }, [currency]);

    useEffect(() => {
        localStorage.setItem('category', category);
    }, [category]);

    useEffect(() => {
        localStorage.setItem('amount', amount);
    }, [amount]);

    localStorage.setItem('currency', currency);
   


    const handleAddBudget = () => {
        if (category === '') {
            setCategoryError('Category is required');
            return;
        }
          
        if (selectedBudgetIndex !== null) {
            const newBudgets = [...budgets];
            newBudgets[selectedBudgetIndex] = { category, amount, currency };
            setBudgets(newBudgets);
            setSelectedBudgetIndex(null);
        } else {
            setBudgets([...budgets, { category, amount, currency }]);
        }
        setCategory('');
        setAmount('');
        setCurrency('SEK'); // Set it back to 'SEK' or any default currency instead of an empty string
    };

    const handleEditBudget = (index) => {
        setSelectedBudgetIndex(index);
        setCategory(budgets[index].category);
        setAmount(budgets[index].amount);
        setCurrency(budgets[index].currency);
    };

    const handleDeleteBudget = (index) => {
        const newBudgets = [...budgets];
        newBudgets.splice(index, 1);
        setBudgets(newBudgets);
      };
      

    return (
        <div >
            <h2>Budget Creation</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleAddBudget();
            }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" gap={2}>
                    <Select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        style={{ width: '100px' }}
                        displayEmpty // This allows the placeholder item to be displayed when no value is selected
                    >
                        <MenuItem value="Currency" disabled>
                            Select Currency
                        </MenuItem>
                        {currencies.map((curr) => (
                            <MenuItem key={curr} value={curr}>
                                {curr}
                            </MenuItem>
                        ))}
                    </Select>
                        <TextField
                            label="Category"
                            value={category}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^[a-zA-ZåäöÅÄÖ() ]*$/.test(value)) {
                                    setCategory(value);
                                    setCategoryError('');
                                } else {
                                    setCategoryError('Category must only contain letters, parentheses, åäö, and spaces');
                                }
                            }}
                            error={!!categoryError}
                            helperText={categoryError}
                        />
                        <TextField
                            label="Amount"
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value);
                                setAmountError('');
                            }}
                            type="number"
                            error={!!amountError}
                            helperText={amountError}
                        />
                    </Box>
                    <Button variant="outlined" color="primary" type="submit">
                        {selectedBudgetIndex !== null ? 'Update Budget' : 'Add category to Budget'}
                    </Button>
                </Box>
            </form >
            <List>
            {budgets.map((budget, index) => (
                <ListItem key={index} style={{ backgroundColor: '#f5f5f5', margin: '10px 0' }}>
                    <ListItemText primary={budget.category} secondary={`${budget.amount} ${budget.currency}`} />
                    <Box display="flex" gap={2}>
                        <Button variant="contained" color="primary" onClick={() => handleEditBudget(index)}>
                            Edit
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => handleDeleteBudget(index)}>
                            Delete
                        </Button>
                    </Box>
                </ListItem>
            ))}
        </List>
            <hr />
            <Box mt={2}>
                <h3>Total Budget: {budgets.reduce((total, budget) => total + Number(budget.amount), 0)} SEK</h3>
            </Box>
        </div>
    );
};

export default BudgetComponent;