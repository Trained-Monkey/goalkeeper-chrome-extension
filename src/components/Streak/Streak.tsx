import React, { useState, useEffect } from "react";
import StreakInput from "../../interface/StreakInput";
import "./Streak.css";
import fireUnlitImg from "../../assets/Streak/fire-unlit.svg";
import fireLitImg from "../../assets/Streak/fire-lit.svg";
import { getFromStoragePromise, storeInStorage } from "../../utils/ChromeStorage";
import Goal from "../../interface/Goal";
import StreakStoredData from "../../interface/StreakStoredData";

function getMidnight(date: Date): Date {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
}

function getStreakFromStorage(initialState: any, callback: any): void {
    const storageQuery: StreakStoredData = {
        counter: initialState.counter,
        lastCompleted: initialState.lastCompleted.toString()
    };

    getFromStoragePromise(storageQuery)?.then((result) => {
        if (result["counter"] == null) {
            return;
        }
        callback(result);
    })
    return;
}

function storeStreakInStorage(state: any): void {
    const storageQuery: StreakStoredData = {
        counter: state.counter,
        lastCompleted: state.lastCompleted.toString()
    }
    storeInStorage(storageQuery);
}

function Streak(props: StreakInput): React.JSX.Element {
    const [streak, setStreak] = useState({
        counter: 0,
        lastCompleted: new Date(Date.UTC(0, 0, 0, 0, 0, 0))
    })
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const callback = (value: StreakStoredData) => {
            setStreak(prev => {
                return {
                    ...prev,
                    counter: value.counter,
                    lastCompleted: new Date(value.lastCompleted)
                }
            });
            setLoaded(true);
        }
        getStreakFromStorage(streak, callback);
    }, [])

    useEffect(() => {
        if (loaded) {
            storeStreakInStorage(streak);
        }
    }, [loaded, streak])

    // Get goals from props and determine if we are meant to increment streak
    // counter
    const { goals } = props;
    const currentDate = new Date();
    const numUnfinishedGoals = goals.reduce((curr: number, acc: Goal) => {
        if (acc.lastCompleted < currentDate) {
            return curr + 1;
        }
        return curr;
    }, 0)

    // Need to ensure we are only incrementing streak counter if data has been
    // loaded
    if (loaded) {
        if (numUnfinishedGoals === 0 && streak.lastCompleted < currentDate) {
            setStreak(prev => {
                return {
                    counter: prev.counter + 1,
                    lastCompleted: getMidnight(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000))
                }
            })
        } else if (numUnfinishedGoals > 0 && streak.lastCompleted > currentDate) {
            setStreak(prev => {
                return {
                    counter: prev.counter - 1,
                    lastCompleted: getMidnight(currentDate)
                }
            })
        }
    }

    return (<div className="streak-container manage-goal-item">
        <h1>{streak.counter === 0 ? null : streak.counter} </h1>
        <img src={
            streak.counter === 0 ? fireUnlitImg : fireLitImg
        }
            alt="Fire icon" width="50" height="50" />
    </div>);
}

export default Streak;