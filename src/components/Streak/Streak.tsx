import React, { useState, useContext } from "react";
import StreakInput from "../../interface/StreakInput";
import "./Streak.css";
import fireUnlitImg from "../../assets/Streak/fire-unlit.svg";
import fireLitImg from "../../assets/Streak/fire-lit.svg";
import { StreakContext } from "../../context/StreakContext";
import GoalInput from "../../interface/GoalInput";

function getMidnight(date: Date): Date{
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
}

function getStreak(): number{
    return 0;
}

// Read from chrome storage
function getLastCompleted(): Date {
    return new Date();
}

function Streak(props: StreakInput): React.JSX.Element {
    const [streakCounter, setStreakCounter] = useState(getStreak());
    const [lastCompleted, setLastCompleted] = useState(getLastCompleted());

    // Get goals from props and determine if we are meant to increment streak
    // counter
    const { goals }  = props;
    const currentDate = new Date();
    const counter = goals.reduce((curr: number, acc: GoalInput) => {
        if (acc.lastCompleted < currentDate){
            return curr + 1;
        }
        return curr;
    }, 0)

    if (counter === 0 && lastCompleted < currentDate){
        setStreakCounter(prev => prev + 1);
        setLastCompleted(prev => {
            return getMidnight(new Date(prev.getTime() + 24 * 60 * 60 * 1000));
        })
    } else if (counter > 0 && lastCompleted > currentDate){
        setStreakCounter(prev => prev - 1);
        setLastCompleted(getMidnight(currentDate));
    }

    return (<div className="streak-container manage-goal-item"> 
        <h1>{streakCounter === 0 ? null : streakCounter} </h1>
        <img src={
                streakCounter === 0 ? fireUnlitImg: fireLitImg
            } 
            alt="Fire icon" width="50" height="50"/>
    </div>);
}

export default Streak;