import { useMemo, useReducer, useState, useEffect } from "react";
import { ReducerAttributes, STREAK_REDUCER_ACTIONS } from "../constants/Streak";
import StreakStoredData from "../interface/StreakStoredData";
import { getMidnight } from "../utils/Date";
import { getFromStorage, storeInStorage } from "../utils/Storage";

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
      const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      return {
        counter: state.counter + 1,
        lastCompleted: getMidnight(tomorrow)
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

function useStreak() {
  const defaultStreakValue = useMemo(() => {
    return {
      counter: 0,
      lastCompleted: new Date(Date.UTC(0, 0, 0, 0, 0, 0))
    }
  }, []);
  const [streak, streakDispatch] = useReducer(streakReducer,
    defaultStreakValue);
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
  }, [defaultStreakValue])

  // Stores current streak data in storage only if our data has been loaded
  useEffect(() => {
    if (isLoaded) {
      storeStreakInStorage(streak);
    }
  }, [isLoaded, streak])

  return [streak, streakDispatch];
}

export default useStreak;