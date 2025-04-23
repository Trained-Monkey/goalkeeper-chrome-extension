import React from "react";
import GoalInput from "../interface/GoalInput";
import { TYPES } from "../constants/Goal";

function Goal(prop: GoalInput): React.JSX.Element {
    const { name, type, last_completed, callback }  = prop;
    const expiry: Date = last_completed;

    return (
        <div>
            <p> {name} </p>
            <p> {type}</p>
            <p> {expiry.toISOString()} </p>
            <p onClick={callback}> Button </p>
        </div>
    )
}

export default Goal;