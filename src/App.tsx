import React, { useEffect, useReducer, useState } from 'react';
// Components & Interfaces
import GoalList from './components/GoalList/GoalList';
import Streak from './components/Streak/Streak';
import AddGoalButton from './components/AddGoal/AddGoalButton';
import { GoalInput } from './components/GoalList/Goal/Goal';
import Goal from './interface/Goal';
import { REDUCER_ACTION_TYPES, ReducerAttributes } from './constants/GoalList';
// Misc
import { getFromStorage, storeInStorage } from './utils/Storage';
import './App.css';
import { TYPES } from './constants/Goal';

function goalsReducer(state: Goal[] | null, action: ReducerAttributes): Goal[] {
  if (state == null) {
    state = []
  }

  // Letting typescript know some attributes wont be null despite being optional
  // could refactor in future to ensure attributes must be present.
  if (action.action === REDUCER_ACTION_TYPES.TOGGLE) {
    return state.map((oldGoalState, index) => {
      if (index === action.index) {
        const currentDate = new Date();
        let operand = 1;
        let newTime;
        let diff;
        switch (oldGoalState.type) {
          case TYPES.DAILY:
            newTime = oldGoalState.lastCompleted.getDate()
            diff = 1;
            break;
          case TYPES.WEEKLY:
            newTime = oldGoalState.lastCompleted.getDate()
            diff = 7;
            break;
          case TYPES.FORTNIGHTLY:
            newTime = oldGoalState.lastCompleted.getDate()
            diff = 14;
            break;
          case TYPES.MONTHLY:
            newTime = oldGoalState.lastCompleted.getMonth()
            diff = 1;
            break;
          default:
            newTime = oldGoalState.lastCompleted.getDate();
            diff = 0;
        }
        if (oldGoalState.lastCompleted > currentDate) {
          operand = -1;
        }

        let lastCompleted;
        switch (oldGoalState.type) {
          case TYPES.MONTHLY:
            lastCompleted = new Date(
              new Date(oldGoalState.lastCompleted)
                .setMonth(newTime + diff * operand)
            );
            break;

          case TYPES.DAILY:
          case TYPES.WEEKLY:
          case TYPES.FORTNIGHTLY:
          default:
            lastCompleted = new Date(
              new Date(oldGoalState.lastCompleted)
                .setDate(newTime + diff * operand)
            );
            break;
        }

        return {
          ...oldGoalState,
          lastCompleted: lastCompleted
        };

      }
      return oldGoalState;
    })
  } else if (action.action === REDUCER_ACTION_TYPES.DELETE) {
    return state.filter((_, index) => index !== action.index);
  } else if (action.action === REDUCER_ACTION_TYPES.LOAD) {
    return action.storedGoals!;
  } else if (action.action === REDUCER_ACTION_TYPES.ADD) {
    return [...state, {
      ...action.newGoal!
    }]
  }
  throw Error(`Unknown action ${action.action}.`);
}

function App() {
  const emptyList: Goal[] = [];
  const [storedGoals, storedGoalsDispatch] = useReducer(goalsReducer, emptyList);
  const [isLoaded, setIsLoaded] = useState(false);

  // Get our stored goals data from storage
  useEffect(() => {
    getFromStorage({ 'goals': [] })?.then((result) => {
      const goals = result['goals'].map(((goal: any) => {
        const result = { ...goal }
        result.lastCompleted = new Date(goal.lastCompleted.toString());
        return result;
      }))
      storedGoalsDispatch({
        action: REDUCER_ACTION_TYPES.LOAD,
        storedGoals: goals
      })
      setIsLoaded(true);
    })
  }, [])

  useEffect(() => {
    if (isLoaded) {
      const formattedGoals = storedGoals.map((goal: any) => {
        const result = { ...goal };
        result.lastCompleted = goal.lastCompleted.toString();
        return result;
      })
      storeInStorage({ goals: formattedGoals });
    }
  }, [storedGoals, isLoaded])

  // Attaching our callbacks for marking and deleting goal
  const goalsWithCallback: GoalInput[] =
    storedGoals.map((prev, index) => {
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
    })

  const addGoal = (newGoal: Goal) => {
    storedGoalsDispatch({
      action: REDUCER_ACTION_TYPES.ADD,
      newGoal: newGoal
    })
  }

  return (
    <div className="app">
      <GoalList goals={goalsWithCallback} />
      <div className="manage-goal-container">
        <Streak goals={storedGoals} />
        <AddGoalButton addGoalCallback={addGoal} />
      </div>

    </div>
  );
}

export default App;
