import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import BudgetComponent from './components/BudgetComponent';
import ExpenseInputComponent from './components/ExpenseInputComponent';
import BudgetTrackingComponent from './components/BudgetTrackingComponent';
import TransactionHistoryComponent from './components/TransactionHistoryComponent';
import HomePage from './components/HomePage';
import GoalsComponent from './components/GoalsComponent';
import StatisticsComponent from './components/StatisticsComponent';

function App() {
  const [budgets, setBudgets] = useState(JSON.parse(localStorage.getItem('budgets')) || []);
  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expenses')) || []);
  const [goals] = useState(JSON.parse(localStorage.getItem('goals')) || []);
  const [currency] = useState(localStorage.getItem('currency') || 'SEK');
  
  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('goals', JSON.stringify(goals));
    localStorage.setItem('currency', JSON.stringify(currency));
}, [budgets, expenses, goals, currency]); // Include 'budgets' in the dependency array


  return (
    <Router>
      <Container maxWidth="lg">
        <AppBar position="static">
        <Typography variant="h4" style={{marginLeft: '25px'}}>Expense Tracker</Typography>
          <Toolbar>
          <Button component={Link} to="/" color="inherit"style={{fontWeight: 'bolder'}}>Home</Button>
            <Button component={Link} to="/budget" color="inherit" style={{fontWeight: 'bolder'}}>Budget</Button>
            <Button component={Link} to="/expenses" color="inherit"style={{fontWeight: 'bolder'}}>Expenses</Button>
            <Button component={Link} to="/tracking" color="inherit"style={{fontWeight: 'bolder'}}>Tracking</Button>
            <Button component={Link} to="/history" color="inherit"style={{fontWeight: 'bolder'}}>History</Button>
            <Button component={Link} to="/goals" color="inherit"style={{fontWeight: 'bolder'}}>Goals</Button>
            <Button component={Link} to="/statistics" color="inherit"style={{fontWeight: 'bolder'}}>Statistics</Button>
          </Toolbar>
        </AppBar>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/budget" element={<BudgetComponent budgets={budgets} setBudgets={setBudgets} />} />
          <Route path="/expenses" element={<ExpenseInputComponent budgets={budgets} expenses={expenses} setExpenses={setExpenses} />} />
          <Route path="/tracking" element={
                        <BudgetTrackingComponent 
                            expenses={expenses} 
                            budgets={budgets} 
                        />} 
                    />          
                    <Route path="/history" element={<TransactionHistoryComponent expenses={expenses} />} />
                    <Route path="/goals" element={<GoalsComponent />} />
                    <Route path="/statistics" element={<StatisticsComponent expenses={expenses} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;