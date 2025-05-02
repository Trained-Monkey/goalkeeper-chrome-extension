import Goal from "../interface/Goal";

export enum REDUCER_ACTION_TYPES {
  LOAD = "load",
  TOGGLE = "toggle",
  DELETE = "delete",
  ADD = "add"
}

export interface ReducerAttributes {
  action: REDUCER_ACTION_TYPES,

  // Load
  storedGoals?: Goal[],

  // Toggle & Delete
  index?: number,
  nextGoalState?: Goal,

  // Add
  newGoal?: Goal
}