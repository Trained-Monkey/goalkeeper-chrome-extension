import Goal from "../interface/Goal";

export enum REDUCER_ACTION_TYPES {
  // Load list of goals from storage
  LOAD = "load",
  // Mark the goal as completed or unmark it
  TOGGLE = "toggle",
  // Delete the goal
  DELETE = "delete",
  // Add a new goal to the list
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