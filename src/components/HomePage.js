import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import TransactionHistory from '../images/TransactionHistory.png';
import Expenses from '../images/Expenses.png';
import Budget from '../images/Budget.png';
import BudgetTracker from '../images/BudgetTracker.png';

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
                            Want to remember that time you bought a yacht? Check your transaction history!
                        </Typography>
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
                            Money doesn't grow on trees. Plan your budget and save for that dream vacation!
                        </Typography>
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
                            Keep an eye on your spending habits with our fancy budget tracker!
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default HomePage;