import React, { useState } from "react";
import StreakInput from "../../interface/StreakInput";
import "./Streak.css";
// const logo = require("../../../public/fire.svg") as string;

function Streak(prop: StreakInput): React.JSX.Element {
    const { streakCounter } = prop;
    const [streak, ] = useState( streakCounter );

    return (<div className="streak-container manage-goal-item"> 
        <h1>{streak === 0 ? null : streak} </h1>
        <img src="/fire.svg" alt="Fire icon" width="50" height="50"/>

    </div>);
}

export default Streak;