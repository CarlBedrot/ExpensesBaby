import React, { useState } from 'react';
import { List, ListItem, ListItemText, TextField, Box, Typography } from '@mui/material';

const TransactionHistoryComponent = ({ expenses }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Grouping expenses by category
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const category = expense.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(expense);
    return acc;
  }, {});

  // Filter groups based on search term
  const filteredGroups = searchTerm
    ? Object.keys(groupedExpenses).filter(category => category.toLowerCase().includes(searchTerm.toLowerCase()))
    : Object.keys(groupedExpenses);

  return (
    <div>
      <h2>Transaction History</h2>
      <Box mb={2}>
        <TextField
          label="Search by Category"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
      </Box>
      {filteredGroups.map((category, index) => (
        <Box key={index} mb={2}>
          <Typography variant="h6" gutterBottom>
            <span style={{ backgroundColor: 'yellow' }}>
              {category} - Total: {groupedExpenses[category].reduce((total, expense) => total + Number(expense.amount), 0).toFixed(2) + ' kr'}
            </span>
          </Typography>
          <List>
            {groupedExpenses[category].map((expense, expenseIndex) => (
              <ListItem key={expenseIndex}>
                <ListItemText
                  primary={`${expense.amount} kr`}
                  secondary={`${expense.date} - ${expense.description}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </div>
  );
};

export default TransactionHistoryComponent;
