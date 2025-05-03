export enum STREAK_REDUCER_ACTIONS {
  // Increment current streak if not already incremented
  CEIL = "ceil",
  // Decrease current streak if not already decreased
  FLOOR = "floor",
  // Resets the streak counter to zero
  RESET = "reset",
  // Loads a streak counter from storage API
  LOAD = "load"
}

export interface ReducerAttributes {
  action: STREAK_REDUCER_ACTIONS,

  // Load
  counter?: number,
  lastCompleted?: Date
}