import React from "react";
// Component, Functions and Interfaces
import Goal, { GoalInput } from "./Goal/Goal";
// Misc
import './GoalList.css';
import { goalExpiresBeforeGoal } from "../../utils/Goal";

export interface GoalListInput {
  // List of goals to display
  goals: GoalInput[]
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