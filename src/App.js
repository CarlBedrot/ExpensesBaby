import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import BudgetComponent from './components/BudgetComponent';
import ExpenseInputComponent from './components/ExpenseInputComponent';
import BudgetTrackingComponent from './components/BudgetTrackingComponent';
import TransactionHistoryComponent from './components/TransactionHistoryComponent';
import HomePage from './components/HomePage';
import GoalsComponent from './components/GoalsComponent';

function App() {
  const [budgets, setBudgets] = useState(JSON.parse(localStorage.getItem('budgets')) || []);
  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expenses')) || []);
  const [goals , setGoals] = useState(JSON.parse(localStorage.getItem('goals')) || []);
  
  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('goals', JSON.stringify(goals));
}, [budgets, expenses, goals]); // Include 'budgets' in the dependency array


  return (
    <Router>
      <Container maxWidth="lg">
        <AppBar position="static">
        <Typography variant="h4" style={{marginLeft: '25px'}}>Expense Tracker</Typography>
          <Toolbar>
          <Button component={Link} to="/" color="inherit">Home</Button>
            <Button component={Link} to="/budget" color="inherit">Budget</Button>
            <Button component={Link} to="/expenses" color="inherit">Expenses</Button>
            <Button component={Link} to="/tracking" color="inherit">Tracking</Button>
            <Button component={Link} to="/history" color="inherit">History</Button>
            <Button component={Link} to="/goals" color="inherit">Goals</Button>
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
        </Routes>
      </Container>
    </Router>
  );
}

export default App;