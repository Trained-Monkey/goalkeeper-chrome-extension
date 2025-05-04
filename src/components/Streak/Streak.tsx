import React, { useState, useEffect, useRef, useReducer } from "react";
// Interfaces
import StreakStoredData from "../../interface/StreakStoredData";
import Goal from "../../interface/Goal";
import { STREAK_REDUCER_ACTIONS, ReducerAttributes } from "../../constants/Streak";
// Misc
import "./Streak.css";
import fireUnlitImg from "../../assets/Streak/fire-unlit.svg";
import fireLitImg from "../../assets/Streak/fire-lit.svg";
import {
  getFromStorage,
  storeInStorage
} from "../../utils/Storage";
import { getMidnight } from "../../utils/Date";

export interface StreakInput {
  // List of goals, used to calculate whether we need to increment todays 
  // streak or not
  goals: Goal[],
}

function streakReducer(state: any, action: ReducerAttributes) {
  if (action.action === STREAK_REDUCER_ACTIONS.LOAD) {
    return {
      counter: action.counter,
      lastCompleted: action.lastCompleted
    }
  } else if (action.action === STREAK_REDUCER_ACTIONS.RESET) {
    return {
      counter: 0,
      lastCompleted: getMidnight(new Date())
    }
  } else if (action.action === STREAK_REDUCER_ACTIONS.CEIL) {
    if (state.lastCompleted < new Date()) {
      return {
        counter: state.counter + 1,
        lastCompleted: getMidnight(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
      }
    }
    return state;
  } else if (action.action === STREAK_REDUCER_ACTIONS.FLOOR) {
    if (state.lastCompleted > new Date()) {
      return {
        counter: state.counter - 1,
        lastCompleted: getMidnight(new Date())
      }
    }
    return state
  }

  throw new Error(`Unknown action ${action.action}.`)
}

function getStreakFromStorage(initialState: any, callback: any): void {
  const storageQuery: StreakStoredData = {
    counter: initialState.counter,
    lastCompleted: initialState.lastCompleted.toString()
  };

  getFromStorage(storageQuery)?.then((result) => {
    if (result["counter"] == null) {
      return;
    }
    callback(result);
  })
  return;
}

function storeStreakInStorage(state: any): void {
  const storageQuery: StreakStoredData = {
    counter: state.counter,
    lastCompleted: state.lastCompleted.toString()
  }
  storeInStorage(storageQuery);
}

function Streak(props: StreakInput): React.JSX.Element {
  const defaultStreakValue = {
    counter: 0,
    lastCompleted: new Date(Date.UTC(0, 0, 0, 0, 0, 0))
  };
  const [streak, streakDispatch] = useReducer(streakReducer, defaultStreakValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // Loads streak data from storage
  useEffect(() => {
    const callback = (value: StreakStoredData) => {
      streakDispatch({
        action: STREAK_REDUCER_ACTIONS.LOAD,
        counter: value.counter,
        lastCompleted: new Date(value.lastCompleted)
      })
      setIsLoaded(true);
    }
    getStreakFromStorage(defaultStreakValue, callback);
  }, [])

  // Stores current streak data in storage only if our data has been loaded
  useEffect(() => {
    if (isLoaded) {
      storeStreakInStorage(streak);
    }
  }, [isLoaded, streak])

  // Get goals from props and determine if we are meant to increment streak
  // counter
  const { goals } = props;
  const currentDate = new Date();
  const numUnfinishedGoals = goals.reduce((curr: number, acc: Goal) => {
    if (acc.lastCompleted < currentDate) {
      return curr + 1;
    }
    return curr;
  }, 0)

  // Need to ensure we are only incrementing streak counter if data has been
  // loaded
  if (isLoaded) {
    if (streak.lastCompleted < getMidnight(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000))) {
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

  return (<div className="streak-container manage-goal-item">
    <h1>{streak.counter === 0 ? null : streak.counter} </h1>
    <img
      src={streak.counter === 0 ? fireUnlitImg : fireLitImg}
      alt="Streak icon"
      width="50"
      height="50"
    />
  </div>);
}

export default Streak;