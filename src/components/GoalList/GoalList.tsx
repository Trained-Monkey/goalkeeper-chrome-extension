import React, { useState, useContext, useEffect } from "react";
import Goal, {getDaysToIncrement} from "./Goal/Goal";
import GoalInput from "../../interface/GoalInput";
import GoalListInput from "../../interface/GoalListInput";
import './GoalList.css';

function goalExpiresBeforeGoal(x: GoalInput, y: GoalInput): number {
    const currentDate = new Date();
    const xCompleted = x.lastCompleted > currentDate;
    const yCompleted = y.lastCompleted > currentDate;

    if (xCompleted && !yCompleted){
        return 1
    }

    if (!xCompleted && yCompleted) {
        return -1;
    }

    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const xExpiry = new Date(x.lastCompleted.getTime() 
        + getDaysToIncrement(x.lastCompleted, x.type)
        * millisecondsPerDay);

    const yExpiry = new Date(y.lastCompleted.getTime() 
        + getDaysToIncrement(y.lastCompleted, y.type)
        * millisecondsPerDay);

    if (xExpiry < yExpiry)
    {
        return -1;
    }
    
    return 1;
}



function GoalList(prop: GoalListInput): React.JSX.Element {
    const {goals} = prop;

    goals.sort((a, b) => goalExpiresBeforeGoal(a,b));

    return (
        <div className="goal-list-container">
            <div className="goal-list header">
                <h1>Goal List</h1>
            </div>
            
            <ul className="list-group">
                {
                    goals.map((goal: GoalInput) => (
                        <Goal key={goal.name} {...goal}/>
                    ))
                }
            </ul>
        </div>
    )
}


export default GoalList;