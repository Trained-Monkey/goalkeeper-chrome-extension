import React from "react";
// Component, Functions and Interfaces
import Goal, { GoalInput, getDaysToIncrement } from "./Goal/Goal";
// Misc
import './GoalList.css';

export interface GoalListInput {
  // List of goals to display
  goals: GoalInput[]
}

function goalExpiresBeforeGoal(x: GoalInput, y: GoalInput): number {
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
    + getDaysToIncrement(x.lastCompleted, x.type)
    * millisecondsPerDay);

  const yExpiry = new Date(y.lastCompleted.getTime()
    + getDaysToIncrement(y.lastCompleted, y.type)
    * millisecondsPerDay);

  if (xExpiry < yExpiry) {
    return xBeforeY;
  }

  return xAfterY;
}

function GoalList(prop: GoalListInput): React.JSX.Element {
  const { goals } = prop;

  goals.sort((a: GoalInput, b: GoalInput) => goalExpiresBeforeGoal(a, b));

  return (
    <div className="goal-list-container">
      <div className="goal-list header">
        <h1>Goal List</h1>
      </div>

      <ul className="list-group">
        {
          goals.map((goal: GoalInput) => (
            <Goal key={goal.name + goal.lastCompleted.getTime()} {...goal} />
          ))
        }
      </ul>
    </div>
  )
}


export default GoalList;