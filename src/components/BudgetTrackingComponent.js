import React from 'react';
import { Grid, Card, CardContent, Box, LinearProgress, Typography } from '@mui/material';
import { green, yellow, red } from '@mui/material/colors';

const BudgetTrackingComponent = ({ expenses, budgets }) => {
  if (!Array.isArray(expenses) || !Array.isArray(budgets)) {
    return <div>Loading or no data available...</div>;
  }

  // Calculate total expenses for each category
  const totalExpensesByCategory = expenses.reduce((acc, expense) => {
    const expenseAmount = parseFloat(expense?.amount);
    if (expense?.category && !isNaN(expenseAmount)) {
      acc[expense.category] = (acc[expense.category] || 0) + expenseAmount;
    }
    return acc;
  }, {});

  const getProgressColor = (progress) => {
    if (progress < 50) return green[400];
    if (progress < 75) return yellow[700];
    return red[700];
  };

  // Calculate remaining budget for each category
  const budgetStatus = budgets.map(budget => {
    const budgetAmount = parseFloat(budget?.amount);
    const totalExpenses = totalExpensesByCategory[budget?.category] ?? 0;
    const remaining = budgetAmount - totalExpenses;
    const progress = budgetAmount ? (totalExpenses / budgetAmount) * 100 : 0;

    return {
      category: budget?.category ?? 'Unknown Category',
      totalBudget: budgetAmount.toFixed(2),
      totalExpenses: totalExpenses.toFixed(2),
      remaining: remaining.toFixed(2),
      progress: Math.min(progress, 100) // Ensure progress doesn't exceed 100%
    };
  });

  return (
    <div>
        <Typography variant="h4" gutterBottom>Budget Tracking</Typography>
        <Grid container spacing={2}> {/* Grid container with spacing */}
            {budgetStatus.map((budget, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}> {/* Grid item for each card, adjust sizes as needed */}
                    <Card variant="outlined" style={{ background: 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)' }}>                        <CardContent>
                            <Box width="100%" mb={2}>
                                <Typography variant="h6" component="h3">
                                    {budget.category}
                                </Typography>
                                <Typography color="textSecondary">
                                    Spent: {budget.totalExpenses} kr / Budget: {budget.totalBudget} kr
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={budget.progress}
                                    style={{ height: '10px', borderRadius: '5px', backgroundColor: '#eee' }}
                                    sx={{ '& .MuiLinearProgress-bar': { backgroundColor: getProgressColor(budget.progress) } }}
                                />
                                <Box display="flex" justifyContent="space-between" mt={1}>
                                    <Typography variant="body2" color="textSecondary">
                                        Remaining: {budget.remaining} kr
                                    </Typography>
                                    <Typography variant="body2" color={getProgressColor(budget.progress)}>
                                        {budget.progress.toFixed(2)}%
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </div>
);
};

export default BudgetTrackingComponent;