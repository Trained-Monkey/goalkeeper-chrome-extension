import React, { useState } from 'react';
// Components & Interfaces
import Streak from './components/Streak/Streak';
import Goal from './interface/Goal';
import { REDUCER_ACTION_TYPES } from './constants/GoalList';
import List from './components/List/List';

// Misc
import './App.css';
import ListItem from './components/ListItem/ListItem';
import Button from './components/Button/Button';
import { timeTillDueString } from './utils/Goal';
import Dialog from './components/Dialog/Dialog';
import useGoals from './hooks/useGoals';
import useStreak from './hooks/useStreak';
import { getMidnight } from './utils/Date';
import { STREAK_REDUCER_ACTIONS } from './constants/Streak';

function App() {
  const [storedGoals, storedGoalsDispatch] = useGoals();
  const [streak, streakDispatch] = useStreak();
  // const streak = 10;
  const [openDialog, setOpenDialog] = useState(false);

  // Attaching our callbacks for marking and deleting goal
  const goalsWithCallback: any[] = storedGoals.map(
    (prev, index) => {
      return {
        ...prev,
        deletionCallback: () => {
          storedGoalsDispatch({
            action: REDUCER_ACTION_TYPES.DELETE,
            index: index
          })
        },
        finishedCallback: () => {
          storedGoalsDispatch({
            action: REDUCER_ACTION_TYPES.TOGGLE,
            index: index,
          })
        }
      }
    }
  )

  // Handle logic between goal and streak here
  const currentDate = new Date();
  const numUnfinishedGoals = storedGoals.reduce((curr: number, acc: Goal) => {
    if (acc.lastCompleted < currentDate) {
      return curr + 1;
    }
    return curr;
  }, 0)

  // Need to ensure we are only incrementing streak counter if data has been
  // loaded
  if (true) {
    const nextDay = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
    const nextMidnight = getMidnight(nextDay);
    if (streak.lastCompleted < nextMidnight) {
      streakDispatch({
        action: STREAK_REDUCER_ACTIONS.RESET,
      })
    }
    if (numUnfinishedGoals === 0 && streak.lastCompleted < currentDate) {
      streakDispatch({
        action: STREAK_REDUCER_ACTIONS.CEIL,
      })
    } else if (numUnfinishedGoals > 0 && streak.lastCompleted > currentDate) {
      streakDispatch({
        action: STREAK_REDUCER_ACTIONS.FLOOR,
      })
    }
  }

  const addGoal = (newGoal: Goal) => {
    storedGoalsDispatch({
      action: REDUCER_ACTION_TYPES.ADD,
      newGoal: newGoal
    })
  }

  return (
    <div className="app">
      <List title="Goals">
        {goalsWithCallback.map((goal) => {
          return <ListItem isSuccess={goal.lastCompleted.getTime() > Date.now()}>
            <p> {goal.name} </p>
            <p> {timeTillDueString(goal.lastCompleted, goal.type)} </p>
            <p> {goal.type} </p>
            <Button
              content={goal.lastCompleted.getTime() > Date.now() ? "Undo" : "Done"}
              onClick={goal.finishedCallback}
            />
            <Button
              content="Delete"
              onClick={goal.deletionCallback}
              isDanger={true}
            />
          </ListItem>
        })}
      </List>
      <div className="manage-goal-container">
        <Streak counter={streak.counter} />
        <Button
          content={"Add Goal"}
          onClick={() => { setOpenDialog(true) }}
        />

        <Dialog
          title="Add Goal"
          isOpen={openDialog}
          closeDialog={() => { setOpenDialog(false) }}
        >
        </Dialog>
      </div>
    </div>
  );
}

export default App;
