import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import TransactionHistory from '../images/TransactionHistory.png';
import Expenses from '../images/Expenses.png';
import Budget from '../images/Budget.png';
import BudgetTracker from '../images/BudgetTracker.png';
import Goals from '../images/Goals.png';
import Statistics from '../images/statistics.png';

const HomePage = () => {
    return (
        <Grid container spacing={2} style={{ padding: '20px' }}>
            <Grid item xs={12} sm={6}>
                <Card raised>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Add Expenses</Typography>
                        <CardMedia
                            component="img"
                            image={Expenses}
                            alt="Add Expenses Screenshot"
                            style={{ height: '200px', objectFit: 'contain' }}
                            sx={{ transition: 'transform 0.15s ease-in-out', '&:hover': { transform: 'scale(1.35)' } }}
                        />
                        <Typography variant="body1">
                            Who spent all the money? Oh, it was you. Track your expenses here!
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card raised>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Transaction History</Typography>
                        <CardMedia
                            component="img"
                            image={TransactionHistory}
                            alt="Transaction History Screenshot"
                            style={{ height: '200px', objectFit: 'contain' }}
                            sx={{ transition: 'transform 0.15s ease-in-out', '&:hover': { transform: 'scale(1.45)' } }}
                        />
                        <Typography variant="body1">
                        Ever feel like a financial archaeologist? Dig through the ruins of your transaction history and piece together the epic saga of your cash crusade!                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card raised>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Budget</Typography>
                        <CardMedia
                            component="img"
                            image={Budget}
                            alt="Budget Screenshot"
                            style={{ height: '200px', objectFit: 'contain' }}
                            sx={{ transition: 'transform 0.15s ease-in-out', '&:hover': { transform: 'scale(1.45)' } }}
                        />
                        <Typography variant="body1">
                        Assembling your budget like a fragile house of cards? Place each dollar with care, or brace for the gust of unexpected expenses to bring it all down!                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card raised>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Budget Tracker</Typography>
                        <CardMedia
                            component="img"
                            image={BudgetTracker}
                            alt="Budget Tracker Screenshot"
                            style={{ height: '200px', objectFit: 'contain' }}
                            sx={{ transition: 'transform 0.15s ease-in-out', '&:hover': { transform: 'scale(1.45)' } }}
                        />
                        <Typography variant="body1">
                        Think you're a budgeting wizard until reality casts a 'Broke Again' spell? Track your fiscal fantasies vs. harsh truths here and brace for impact!                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card raised>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Goals</Typography>
                        <CardMedia
                            component="img"
                            image={Goals}
                            alt="Goals Tracker Screenshot"
                            style={{ height: '200px', objectFit: 'contain' }}
                            sx={{ transition: 'transform 0.15s ease-in-out', '&:hover': { transform: 'scale(1.25)' } }}
                        />
                        <Typography variant="body1">
                            Saving to hedge against the crippling depression of poverty? Set a goal and track your progress!
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card raised>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Statistics</Typography>
                        <CardMedia
                            component="img"
                            image={Statistics}
                            alt="Goals Tracker Screenshot"
                            style={{ height: '200px', objectFit: 'contain' }}
                            sx={{ transition: 'transform 0.15s ease-in-out', '&:hover': { transform: 'scale(1.25)' } }}
                        />
                        <Typography variant="body1">
                            View stats over how you spend your money!
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default HomePage;