import React from "react";
import GoalInput from "../interface/GoalInput";
import { TYPES } from "../constants/Goal";

function treatAsUTC(date: Date): Date {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}

function getDaysBetweenDate(start: Date, end: Date): number {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (treatAsUTC(end).getTime() - treatAsUTC(start).getTime()) / millisecondsPerDay;
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

    if (daysTillExpiry > monthThreshold) {
        var unitOfTime: string = "month";
        var numUnits: number = Math.floor(daysTillExpiry / monthThreshold);
    } else if (daysTillExpiry > weekThreshold) {
        var unitOfTime: string = "week";
        var numUnits: number = Math.floor(daysTillExpiry / weekThreshold);
    } else if (daysTillExpiry > dayThreshold){
        var unitOfTime: string = "day";
        var numUnits: number = Math.floor(daysTillExpiry);
    } else {
        var unitOfTime: string = "hour";
        var numUnits: number = hoursTillExpiry;
    }

    if (numUnits > 1){
        unitOfTime += "s";
    }
    
    return `Expires in ${numUnits.toString()} ${unitOfTime}`;
}

function timeToExpiryString(lastCompleted: Date, goalType: TYPES): string{
    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    switch (goalType){
        case TYPES.DAILY:
            var daysToIncrement = 1;
            break;
        case TYPES.WEEKLY:
            var daysToIncrement = 7;
            break;
        case TYPES.FORTNIGHTLY:
            var daysToIncrement = 14;
            break;
        case TYPES.MONTHLY:
            const toBeCompletedBy = new Date(new Date(lastCompleted)
                .setMonth(lastCompleted.getMonth() + 1));
            
            var daysToIncrement = getDaysBetweenDate(
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
    const { name, type, lastCompleted, deletionCallback }  = prop;
    const expiry: string = timeToExpiryString(lastCompleted, type);

    return (
        <div>
            <p> {name} </p>
            <p> {type}</p>
            <p> {expiry} </p>
            <button onClick={deletionCallback}> Done </button>
        </div>
    )
}

export default Goal;