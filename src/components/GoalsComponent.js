import React, { useState, useEffect } from 'react';
import { Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const GoalsComponent = () => {
    const classes = useStyles();
    const [goals, setGoals] = useState([]);
    const [open, setOpen] = useState(false);
    const [tempGoal, setTempGoal] = useState({title: '', description: ''});
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const savedGoals = localStorage.getItem('goals');
        if (savedGoals) {
            setGoals(JSON.parse(savedGoals));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('goals', JSON.stringify(goals));
    }, [goals]);

    const addGoal = () => {
        setGoals([...goals, tempGoal]);
        setTempGoal({title: '', description: ''});
        setOpen(false);
    };

    const startEditGoal = (index) => {
        setTempGoal(goals[index]);
        setEditIndex(index);
        setOpen(true);
    };

    const editGoal = () => {
        setGoals(goals.map((goal, i) => (i === editIndex ? tempGoal : goal)));
        setTempGoal({title: '', description: ''});
        setEditIndex(null);
        setOpen(false);
    };

    const deleteGoal = (index) => {
        setGoals(goals.filter((goal, i) => i !== index));
    };

    return (
        <div className={classes.root}>
            <h2>Goals</h2>
            <List>
                {goals.map((goal, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={goal.title} secondary={goal.description} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => deleteGoal(index)}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="edit" onClick={() => startEditGoal(index)}>
                                <EditIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
            >
                Add Goal
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{editIndex !== null ? 'Edit Goal' : 'Add Goal'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        value={tempGoal.title}
                        onChange={(e) => setTempGoal({...tempGoal, title: e.target.value})}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={tempGoal.description}
                        onChange={(e) => setTempGoal({...tempGoal, description: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={editIndex !== null ? editGoal : addGoal} color="primary">
                        {editIndex !== null ? 'Edit' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default GoalsComponent;