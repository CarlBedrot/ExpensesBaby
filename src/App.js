import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import BudgetComponent from './components/BudgetComponent';
import ExpenseInputComponent from './components/ExpenseInputComponent';
import BudgetTrackingComponent from './components/BudgetTrackingComponent';
import TransactionHistoryComponent from './components/TransactionHistoryComponent';
import HomePage from './components/HomePage';
import GoalsComponent from './components/GoalsComponent';
import StatisticsComponent from './components/StatisticsComponent';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // Corrected import
import TimelineIcon from '@mui/icons-material/Timeline';

function App() {
  const [budgets, setBudgets] = useState(JSON.parse(localStorage.getItem('budgets')) || []);
  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expenses')) || []);
  const [goals] = useState(JSON.parse(localStorage.getItem('goals')) || []);
  const [currency] = useState(localStorage.getItem('currency') || 'SEK');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
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
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" style={{marginLeft: '25px'}}>Expense Tracker</Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/budget" onClick={toggleDrawer}>
            <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
            <ListItemText primary="Budget" />
          </ListItem>
          <ListItem button component={Link} to="/expenses" onClick={toggleDrawer}>
            <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
            <ListItemText primary="Expenses" />
          </ListItem>
          <ListItem button component={Link} to="/tracking" onClick={toggleDrawer}>
            <ListItemIcon><TimelineIcon /></ListItemIcon>
            <ListItemText primary="Tracking" />
          </ListItem>
          <ListItem button component={Link} to="/history" onClick={toggleDrawer}>
            <ListItemIcon><HistoryIcon /></ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
          <ListItem button component={Link} to="/goals" onClick={toggleDrawer}>
            <ListItemIcon><FitnessCenterIcon /></ListItemIcon>
            <ListItemText primary="Goals" />
          </ListItem>
          <ListItem button component={Link} to="/statistics" onClick={toggleDrawer}>
            <ListItemIcon><BarChartIcon /></ListItemIcon>
            <ListItemText primary="Statistics" />
          </ListItem>
        </List>
      </Drawer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/budget" element={<BudgetComponent budgets={budgets} setBudgets={setBudgets} />} />
        <Route path="/expenses" element={<ExpenseInputComponent budgets={budgets} expenses={expenses} setExpenses={setExpenses} />} />
        <Route path="/tracking" element={<BudgetTrackingComponent expenses={expenses} budgets={budgets} />} />
        <Route path="/history" element={<TransactionHistoryComponent expenses={expenses} />} />
        <Route path="/goals" element={<GoalsComponent />} />
        <Route path="/statistics" element={<StatisticsComponent expenses={expenses} />} />
      </Routes>
    </Container>
  </Router>
);
}

export default App;