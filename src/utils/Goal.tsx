// Utility functions associated with manipulating goals 
import { GoalInput } from "../components/GoalList/Goal/Goal";
import { TYPES } from "../constants/Goal";
import { getDaysBetweenDates } from "./Date";

// Sorter function to detemine whether a goal should be before or after another
// goal, prioritises showing incomplete goals, then goals that are due first.
// x - First goal to compare
// y - Second goal to compare
export function goalExpiresBeforeGoal(x: GoalInput, y: GoalInput): number {
  const xAfterY = 1;
  const xBeforeY = -1;
  const currentDate = new Date();
  const xCompleted = x.lastCompleted > currentDate;
  const yCompleted = y.lastCompleted > currentDate;

  if (xCompleted && !yCompleted) {
    return xAfterY;
  }

  if (!xCompleted && yCompleted) {
    return xBeforeY;
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const xExpiry = new Date(x.lastCompleted.getTime()
    + daysTillDue(x.lastCompleted, x.type)
    * millisecondsPerDay);

  const yExpiry = new Date(y.lastCompleted.getTime()
    + daysTillDue(y.lastCompleted, y.type)
    * millisecondsPerDay);

  if (xExpiry < yExpiry) {
    return xBeforeY;
  }

  return xAfterY;
}

// Converts given milliseconds to the number of days/weeks/months.
// - milliseconds: Number of milliseconds to convert
export function getMsToUnitOfTime(milliseconds: number): string {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const millisecondsPerHour = 60 * 60 * 1000;
  const monthThreshold = 27;
  const weekThreshold = 7;
  const dayThreshold = 1;
  const daysTillExpiry = Math.floor(milliseconds / millisecondsPerDay);

  milliseconds -= daysTillExpiry * millisecondsPerDay;
  const hoursTillExpiry = Math.floor(milliseconds / millisecondsPerHour);

  let unitOfTime: string;
  let numUnits: number;

  if (daysTillExpiry > monthThreshold) {
    unitOfTime = "month";
    numUnits = Math.floor(daysTillExpiry / monthThreshold);
  } else if (daysTillExpiry > weekThreshold) {
    unitOfTime = "week";
    numUnits = Math.floor(daysTillExpiry / weekThreshold);
  } else if (daysTillExpiry > dayThreshold) {
    unitOfTime = "day";
    numUnits = Math.floor(daysTillExpiry);
  } else {
    unitOfTime = "hour";
    numUnits = hoursTillExpiry;
  }

  if (numUnits > 1) {
    unitOfTime += "s";
  }

  return `${numUnits.toString()} ${unitOfTime}`;
}

// Gets the number of days until the task is due
// - lastCompleted: Date the goal was last completed
// - goalType: Type representing how often goal is to be done
export function daysTillDue(lastCompleted: Date, goalType: TYPES): number {
  let daysRemaining;
  switch (goalType) {
    case TYPES.DAILY:
      daysRemaining = 1;
      break;
    case TYPES.WEEKLY:
      daysRemaining = 7;
      break;
    case TYPES.FORTNIGHTLY:
      daysRemaining = 14;
      break;
    case TYPES.MONTHLY:
      const toBeCompletedBy: Date = new Date(new Date(lastCompleted)
        .setMonth(lastCompleted.getMonth() + 1));

      daysRemaining = getDaysBetweenDates(
        lastCompleted,
        toBeCompletedBy);
      break;
    default:
      throw new Error("Parameter is not a valid goal type.");
  }
  return daysRemaining;
}

// Calculates the number of days until a task is due as a string with a unit of
// measurement attached.
// - lastCompleted: Date goal was last completed
// - goalType: How often goal is to be repeated
export function daysTillDueString(lastCompleted: Date,
  goalType: TYPES): string {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  let numDaysTillDue = daysTillDue(lastCompleted, goalType);

  const currentDate = new Date();
  const millisecondsRemaining = numDaysTillDue
    * millisecondsPerDay
    - getDaysBetweenDates(lastCompleted, currentDate)
    * millisecondsPerDay;

  return getMsToUnitOfTime(millisecondsRemaining);
}