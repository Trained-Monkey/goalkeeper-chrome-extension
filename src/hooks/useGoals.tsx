import { useEffect, useReducer, useState } from "react";
import { TYPES } from "../constants/Goal";
import { REDUCER_ACTION_TYPES, ReducerAttributes } from "../constants/GoalList";
import Goal from "../interface/Goal";
import { getFromStorage, storeInStorage } from "../utils/Storage";
import { goalExpiresBeforeGoal, updateGoal } from "../utils/Goal";

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

function useGoals(): [Goal[], React.ActionDispatch<[action: ReducerAttributes]>] {
  const [goals, goalsDispatch] = useReducer(goalsReducer, []);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Get our stored goals data from storage
  useEffect(() => {
    getFromStorage({ 'goals': [] })?.then((result) => {
      const goals = result['goals'].map(((goal: any) => {
        const result = { ...goal }
        result.lastCompleted = new Date(goal.lastCompleted.toString());
        updateGoal(result);
        return result;
      }))
      goalsDispatch({
        action: REDUCER_ACTION_TYPES.LOAD,
        storedGoals: goals
      })
      setIsDataLoaded(true);
    })
  }, [])

  // Store our goals in storage if our data is loaded
  useEffect(() => {
    if (isDataLoaded) {
      const formattedGoals = goals.map((goal: any) => {
        const result = { ...goal };
        result.lastCompleted = goal.lastCompleted.toString();
        return result;
      })
      storeInStorage({ goals: formattedGoals });
    }
  }, [goals, isDataLoaded])
  goals.sort((a, b) => { return goalExpiresBeforeGoal(a, b)})
  return [goals, goalsDispatch];
}

export default useGoals;