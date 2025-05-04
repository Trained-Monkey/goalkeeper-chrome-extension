import React, { useEffect, useReducer, useState } from 'react';
// Components & Interfaces
import GoalList from './components/GoalList/GoalList';
import Streak from './components/Streak/Streak';
import AddGoal from './components/AddGoal/AddGoal';
import {GoalInput} from './components/GoalList/Goal/Goal';
import Goal from './interface/Goal';
import { REDUCER_ACTION_TYPES, ReducerAttributes } from './constants/GoalList';
// Misc
import { getFromStoragePromise, storeInStorage } from './utils/ChromeStorage';
import './App.css';

function goalsReducer(state: Goal[] | null, action: ReducerAttributes): Goal[] {
  if (state == null){
    state = []
  }

  // Letting typescript know some attributes wont be null despite being optional
  // could refactor in future to ensure attributes must be present.
  if (action.action === REDUCER_ACTION_TYPES.TOGGLE) {
    return state.map((oldGoalInputState, index) => {
      if (index === action.index) {
        return action.nextGoalState!;
      }
      return oldGoalInputState;
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
  const [loaded, setLoaded] = useState(false);

  // Get our stored goals data from storage
  useEffect(() => {
    getFromStoragePromise({ 'goals': [] })?.then((result) => {
      const goals = result['goals'].map(((goal: any) => {
        const result = { ...goal }
        result.lastCompleted = new Date(goal.lastCompleted.toString());
        return result;
      }))
      storedGoalsDispatch({
        action: REDUCER_ACTION_TYPES.LOAD,
        storedGoals: goals
      })
      setLoaded(true);
    })
  }, [])

  useEffect(() => {
    if (loaded) {
      const formattedGoals = storedGoals.map((goal: any) => {
        const result = { ...goal };
        result.lastCompleted = goal.lastCompleted.toString();
        return result;
      })
      storeInStorage({ goals: formattedGoals });
    }
  }, [storedGoals, loaded])

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
        finishedCallback: (nextGoalState: GoalInput) => {
          storedGoalsDispatch({
            action: REDUCER_ACTION_TYPES.TOGGLE,
            index: index,
            nextGoalState: nextGoalState
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
        <AddGoal addGoalCallback={addGoal} />
      </div>

    </div>
  );
}

export default App;
