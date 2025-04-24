import React from "react";
import GoalInput from "../../../interface/GoalInput";
import { TYPES } from "../../../constants/Goal";
import './Goal.css';

function treatAsUTC(date: Date): Date {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}

function getDaysBetweenDate(start: Date, end: Date): number {
    let millisecondsPerDay = 24 * 60 * 60 * 1000;
    let milliseconds = treatAsUTC(end).getTime() - treatAsUTC(start).getTime();
    return milliseconds / millisecondsPerDay;
}

function millisecondsToExpiryString(millisecondsTillExpiry: number): string {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const millisecondsPerHour = 60 * 60 * 1000;
    const monthThreshold = 27;
    const weekThreshold = 7;
    const dayThreshold = 1;
    const daysTillExpiry = Math.floor(millisecondsTillExpiry 
        / millisecondsPerDay);

    millisecondsTillExpiry -= daysTillExpiry * millisecondsPerDay;
    const hoursTillExpiry = Math.floor(millisecondsTillExpiry 
        / millisecondsPerHour);

    let unitOfTime: string;
    let numUnits: number;

    if (daysTillExpiry > monthThreshold) {
        unitOfTime = "month";
        numUnits = Math.floor(daysTillExpiry / monthThreshold);
    } else if (daysTillExpiry > weekThreshold) {
        unitOfTime = "week";
        numUnits = Math.floor(daysTillExpiry / weekThreshold);
    } else if (daysTillExpiry > dayThreshold){
        unitOfTime = "day";
        numUnits = Math.floor(daysTillExpiry);
    } else {
        unitOfTime = "hour";
        numUnits = hoursTillExpiry;
    }

    if (numUnits > 1){
        unitOfTime += "s";
    }
    
    return `Expires in ${numUnits.toString()} ${unitOfTime}`;
}

function timeToExpiryString(lastCompleted: Date, goalType: TYPES): string{
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    let daysToIncrement: number;

    switch (goalType){
        case TYPES.DAILY:
            daysToIncrement = 1;
            break;
        case TYPES.WEEKLY:
            daysToIncrement = 7;
            break;
        case TYPES.FORTNIGHTLY:
            daysToIncrement = 14;
            break;
        case TYPES.MONTHLY:
            const toBeCompletedBy: Date = new Date(new Date(lastCompleted)
                .setMonth(lastCompleted.getMonth() + 1));
            
            daysToIncrement = getDaysBetweenDate(
                lastCompleted, 
                toBeCompletedBy);
            break;
        default:
            throw new Error("Parameter is not a valid goal type.");
    }

    const currentDate = new Date();
    const millisecondsRemaining = daysToIncrement * millisecondsPerDay
        - getDaysBetweenDate(lastCompleted, currentDate) * millisecondsPerDay;

    return millisecondsToExpiryString(millisecondsRemaining);
}

function Goal(prop: GoalInput): React.JSX.Element {
    const { name, type, lastCompleted, 
        deletionCallback, finishedCallback }  = prop;
    const expiry: string = timeToExpiryString(lastCompleted, type);

    return (
        <li className="list-group-item goal-container">
            <p className="goal-text"> {name} </p>
            <p className="goal-text"> {type}</p>
            <p className="goal-text"> {expiry} </p>
            <button onClick={deletionCallback} name="delete-button" 
                className="btn btn-primary"> Delete </button>
            <button onClick={finishedCallback} name="submit-button" 
                className="btn btn-primary"> Done </button>
        </li >
    )
}

export default Goal;