import React, { useState } from "react";
import StreakInput from "../../interface/StreakInput";
import "./Streak.css";
import fireUnlitImg from "../../assets/Streak/fire-unlit.svg";
import fireLitImg from "../../assets/Streak/fire-lit.svg";

function Streak(prop: StreakInput): React.JSX.Element {
    const { streakCounter } = prop;
    const [streak, ] = useState( streakCounter );

    return (<div className="streak-container manage-goal-item"> 
        <h1>{streak === 0 ? null : streak} </h1>
        <img src={
                streak === 0 ? fireUnlitImg: fireLitImg
            } 
            alt="Fire icon" width="50" height="50"/>
    </div>);
}

export default Streak;