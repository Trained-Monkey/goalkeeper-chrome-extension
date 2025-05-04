import React from "react";
// Interfaces
import { TYPES } from "../../../constants/Goal";
// Misc
import './Goal.css';
import { daysTillDueString, daysTillDue } from "../../../utils/Goal";

export interface GoalInput {
  // Name of the goal
  name: string,
  // Type indicating how often the goal needs to be done
  type: TYPES,
  // Midnight of when the last goal was completed
  lastCompleted: Date,
  // Callback to delete goal
  deletionCallback: any
  // Callback to mark goal as finished, expects to receive the new goal state
  finishedCallback: any
}

// React element showing goal alongside with buttons to mark as done or delete
function Goal(prop: GoalInput): React.JSX.Element {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const { 
    name, 
    type, 
    lastCompleted,
    deletionCallback, 
    finishedCallback
  } = prop;
  const expiry: string = daysTillDueString(lastCompleted, type);

  function handleSubmitButtonClick() {
    const nextGoalState: GoalInput = {
      name: name,
      type: type,
      lastCompleted: new Date(lastCompleted.getTime()
        + daysTillDue(lastCompleted, type)
        * millisecondsPerDay),
      deletionCallback: () => { },
      finishedCallback: () => { }
    }

    finishedCallback(nextGoalState);
  }

  function handleDeleteButtonClick() {
    deletionCallback(name);
  }
  const taskCompleted = new Date() < lastCompleted;

  return (
    <li className={
      (taskCompleted
        ? "list-group-item  list-group-item-success"
        : "list-group-item"
      )
      + " goal-container"
    }>
      <div className="goal-item-container text">
        <p className="goal-text"> {name} </p>
      </div>
      <div className="goal-item-container text">
        <p className="goal-text"> {type} </p>
      </div>
      <div className="goal-item-container text">
        <p className="goal-text">
          {taskCompleted
            ? `Refreshes in ${expiry}`
            : `Due in ${expiry}`
          }
        </p>
      </div>
      <div className="goal-item-container button">
        {taskCompleted ? null :
          <button
            onClick={handleSubmitButtonClick}
            name="submit-button"
            className="btn btn-primary"
          >
            Done
          </button>
        }
      </div>

      <div className="goal-item-container button">
        <button onClick={handleDeleteButtonClick} name="delete-button"
          className="btn btn-danger"> Delete </button>
      </div>
    </li >
  )
}

export default Goal;
