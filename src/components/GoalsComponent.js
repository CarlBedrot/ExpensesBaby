import React, { useState, useEffect, useContext, createContext } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    TextField,
    Button,
    Card,
    CardContent,
    LinearProgress,
    Typography,
    Tooltip,
    Snackbar,
    Dialog,
    DialogTitle,
    DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {motion } from 'framer-motion';
import Grid from '@mui/material/Grid';


const GoalsContext = createContext();

function GoalsProvider({ children }) {
    const [goals, setGoals] = useState(JSON.parse(localStorage.getItem('goals')) || []);

    useEffect(() => {
        localStorage.setItem('goals', JSON.stringify(goals));
    }, [goals]);

    return (
        <GoalsContext.Provider value={{ goals, setGoals }}>
            {children}
        </GoalsContext.Provider>
    );
}

function GoalInputForm() {
    const { goals, setGoals } = useContext(GoalsContext);
    const [newGoal, setNewGoal] = useState('');
    const [newTargetAmount, setNewTargetAmount] = useState('');
    const [newSavedAmount, setNewSavedAmount] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const handleAddGoal = () => {
        if (typeof newGoal === 'string' && newGoal.trim() === '') return;
        const goalData = {
            title: newGoal,
            targetAmount: parseFloat(newTargetAmount) || 0,
            savedAmount: parseFloat(newSavedAmount) || 0
        };
        if (editMode) {
            const updatedGoals = [...goals];
            updatedGoals[editIndex] = goalData;
            setGoals(updatedGoals);
            setEditMode(false);
            setEditIndex(null);
        } else {
            setGoals([...goals, goalData]);
        }
        setNewGoal('');
        setNewTargetAmount('');
        setNewSavedAmount('');
    };

    const handleDeleteGoal = () => {
        const updatedGoals = goals.filter((goal, i) => i !== deleteIndex);
        setGoals(updatedGoals);
        setDialogOpen(false);
        setSnackbarOpen(true);
    };

    const handleEditGoal = (index) => {
        setNewGoal(goals[index].title); // Ensure this is a string
        setNewTargetAmount(String(goals[index].targetAmount)); // Convert to string to use in TextField
        setNewSavedAmount(String(goals[index].savedAmount)); // Convert to string to use in TextField
        setEditMode(true);
        setEditIndex(index);
    };
    

    const handleDialogOpen = (index) => {
        setDeleteIndex(index);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Card >  
                  <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Goal" value={newGoal} onChange={e => setNewGoal(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Target Amount" value={newTargetAmount} onChange={e => setNewTargetAmount(e.target.value)} type="number" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField 
                            label="Saved Amount" 
                            value={newSavedAmount} 
                            onChange={e => setNewSavedAmount(e.target.value)} 
                            type="number"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <motion.div 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.9 }}
                            style={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <Button variant="contained" color="primary" onClick={handleAddGoal}>
                                {editMode ? 'Update' : 'Add'} Goal
                            </Button>
                        </motion.div>
                    </Grid>
                </Grid>
                <List>
                    {goals.map((goal, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ListItem key={index} style={{ backgroundColor: '#f5f5f5', margin: '10px 0' }}>
                                <ListItemText primary={goal.title} secondary={`Target: $${goal.targetAmount}`} />
                                <div style={{ width: '150px', height: '150px', marginRight: '15px' }}>
                                    <CircularProgressbar
                                        value={goal.savedAmount}
                                        maxValue={goal.targetAmount}
                                        text={`${Math.round((goal.savedAmount / goal.targetAmount) * 100)}%`}
                                        styles={buildStyles({
                                            pathColor: `rgba(62, 152, 199, ${(goal.savedAmount / goal.targetAmount)})`,
                                            textColor: '#f88',
                                            trailColor: '#d6d6d6',
                                            backgroundColor: '#3e98c7',
                                            strokeWidth: 2,
                                        })}
                                    />
                                </div>
                                <Typography variant="body2" color="textSecondary" style={{ marginRight: '15px', padding: '30px' }}>
                                    {`Saved: $${goal.savedAmount}`}
                                </Typography>
                                <ListItemSecondaryAction>
                                    <Tooltip title="Delete">
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDialogOpen(index)} style={{ marginRight: '10px' }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <IconButton edge="end" aria-label="edit" onClick={() => handleEditGoal(index)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </motion.div>
                    ))}
                </List>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
                        Goal {editMode ? 'updated' : 'added'} successfully!
                    </Alert>
                </Snackbar>
                <Dialog open={dialogOpen} onClose={handleDialogClose}>
                    <DialogTitle>{"Are you sure you want to delete this goal?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteGoal} color="primary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
}

function GoalsComponent() {
    return (
        <GoalsProvider>
            <GoalInputForm />
        </GoalsProvider>
    );
}

export default GoalsComponent;
