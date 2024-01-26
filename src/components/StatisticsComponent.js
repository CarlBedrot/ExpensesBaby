import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, LineChart, Line, CartesianGrid } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const StatisticsComponent = ({ expenses }) => {
    // Calculate the total amount per category
    const amountsPerCategory = expenses.reduce((totals, expense) => {
        if (!totals[expense.category]) {
            totals[expense.category] = 0;
        }
        totals[expense.category] += Number(expense.amount);
        return totals;
    }, {});

    // Calculate the number of expenses per category
    const expensesPerCategory = expenses.reduce((totals, expense) => {
        if (!totals[expense.category]) {
            totals[expense.category] = 0;
        }
        totals[expense.category]++;
        return totals;
    }, {});

    // Calculate the total amount per date
    const amountsPerDate = expenses.reduce((totals, expense) => {
        const date = new Date(expense.date).toISOString().split('T')[0]; // Convert the date to YYYY-MM-DD format
        if (!totals[date]) {
            totals[date] = 0;
        }
        totals[date] += Number(expense.amount);
        return totals;
    }, {});

    // Convert the amounts per category to an array of objects for the PieChart
    const dataForPieChart = Object.keys(amountsPerCategory).map((category, index) => ({
        name: category,
        value: amountsPerCategory[category],
        fill: COLORS[index % COLORS.length]
    }));

    // Convert the number of expenses per category to an array of objects for the BarChart
    const dataForBarChart = Object.keys(expensesPerCategory).map(category => ({
        name: category,
        value: expensesPerCategory[category]
    }));

    // Convert the amounts per date to an array of objects for the LineChart
    const dataForLineChart = Object.keys(amountsPerDate).map(date => ({
        name: date,
        value: amountsPerDate[date]
    }));

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Expenses by Category
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                This pie chart shows the distribution of expenses across different categories.
                            </Typography>
                            <PieChart width={400} height={400}>
                                <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    data={dataForPieChart}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    fontSize={10}
                                    fontWeight='bolder'
                                    label={({ name, percent, value }) => `${name}: ${(percent * 100).toFixed(0)}% (${value} kr)`}
                                >
                                    {dataForPieChart.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    formatter={(value) => `${value} kr`} 
                                    labelFormatter={(name) => `Category: ${name}`}
                                />
                            </PieChart>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Number of Expenses by Category
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                This bar chart shows the number of expenses in each category.
                            </Typography>
                            <BarChart width={500} height={300} data={dataForBarChart}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Expenses Over Time
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                This line chart shows the total amount of expenses for each date.
                            </Typography>
                            <LineChart width={500} height={300} data={dataForLineChart} >
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                            </LineChart>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StatisticsComponent;