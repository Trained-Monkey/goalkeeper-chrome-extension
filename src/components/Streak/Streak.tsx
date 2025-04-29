import React, { useState, useEffect } from "react";
import StreakInput from "../../interface/StreakInput";
import "./Streak.css";
import fireUnlitImg from "../../assets/Streak/fire-unlit.svg";
import fireLitImg from "../../assets/Streak/fire-lit.svg";
import { getFromStoragePromise, storeInStorage } from "../../utils/ChromeStorage";
import Goal from "../../interface/Goal";

function getMidnight(date: Date): Date {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
}

function getStreak(setStreakCounter: (newStreakCounter: number) => void) {
    getFromStoragePromise({ streakCounter: 0 })?.then((result) => {
        if (result["streakCounter"] == null) {
            return;
        }

        setStreakCounter(result["streakCounter"]);
    })
}
function getLastCompleted(): Date {
    return new Date();
}

function Streak(props: StreakInput): React.JSX.Element {
    const [streakCounter, setStreakCounter] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [lastCompleted, setLastCompleted] = useState(getLastCompleted());

    // Need to find a way to store streak
    useEffect(() => {
        const temp = (value: any) => {
            setStreakCounter(value);
            setLoaded(true);
            
        }
        getStreak(temp);
    }, [])

    useEffect(() => {
        if (loaded) {
            storeInStorage({streakCounter: streakCounter});
        }
        

    }, [loaded, streakCounter])
    
    // Get goals from props and determine if we are meant to increment streak
    // counter
    const { goals } = props;
    const currentDate = new Date();
    const counter = goals.reduce((curr: number, acc: Goal) => {
        if (acc.lastCompleted < currentDate) {
            return curr + 1;
        }
        return curr;
    }, 0)

    // Need to ensure we are only incrementing streak counter if data has been
    // loaded
    if (counter === 0 && loaded && lastCompleted < currentDate) {
        setStreakCounter(prev => prev + 1);
        setLastCompleted(prev => {
            return getMidnight(new Date(prev.getTime() + 24 * 60 * 60 * 1000));
        })
    } else if (counter > 0 && loaded && lastCompleted > currentDate) {
        setStreakCounter(prev => prev - 1);
        setLastCompleted(getMidnight(currentDate));
    }

    return (<div className="streak-container manage-goal-item">
        <h1>{streakCounter === 0 ? null : streakCounter} </h1>
        <img src={
            streakCounter === 0 ? fireUnlitImg : fireLitImg
        }
            alt="Fire icon" width="50" height="50" />
    </div>);
}

export default Streak;