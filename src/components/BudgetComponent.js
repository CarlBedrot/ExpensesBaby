import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Box, Card, CardContent, CardActions, Typography } from '@mui/material';


const BudgetComponent = ({ budgets, setBudgets }) => {
    const [category, setCategory] = useState(localStorage.getItem('category') || '');
    const [amount, setAmount] = useState(localStorage.getItem('amount') || '');
    const [selectedBudgetIndex, setSelectedBudgetIndex] = useState(null);
    const [categoryError, setCategoryError] = useState('');
    const [amountError, setAmountError] = useState('');

    useEffect(() => {
        localStorage.setItem('category', category);
    }, [category]);

    useEffect(() => {
        localStorage.setItem('amount', amount);
    }, [amount]);
   


    const handleAddBudget = () => {
        if (category === '') {
            setCategoryError('Category is required');
            return;
          }
        //   if (amount <= 0) {
        //     setAmountError('Amount must be a positive number');
        //     return;
        //   }
          
        if (selectedBudgetIndex !== null) {
            const newBudgets = [...budgets];
            newBudgets[selectedBudgetIndex] = { category, amount };
            setBudgets(newBudgets);
            setSelectedBudgetIndex(null);
        } else {
            setBudgets([...budgets, { category, amount }]);
        }
        setCategory('');
        setAmount('');
    };

    const handleEditBudget = (index) => {
        setSelectedBudgetIndex(index);
        setCategory(budgets[index].category);
        setAmount(budgets[index].amount);
    };

    const handleDeleteBudget = (index) => {
        const newBudgets = [...budgets];
        newBudgets.splice(index, 1);
        setBudgets(newBudgets);
      };
      

    return (
        <div>
            <h2>Budget Creation</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleAddBudget();
            }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" gap={2}>
                        <TextField
                            label="Category"
                            value={category}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^[a-zA-Zåäö() ]*$/.test(value)) {
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
            </form>
            <List>
                {budgets.map((budget, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={budget.category} secondary={`$${budget.amount}`} />
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
                <h3>Total Budget: ${budgets.reduce((total, budget) => total + Number(budget.amount), 0)}</h3>
            </Box>
        </div>
    );
};

export default BudgetComponent;