import React from "react";
// Interfaces

// Misc
import "./Streak.css";
import fireUnlitImg from "../../assets/Streak/fire-unlit.svg";
import fireLitImg from "../../assets/Streak/fire-lit.svg";

export interface StreakInput {
  // List of goals, used to calculate whether we need to increment todays 
  // streak or not
  counter: number
}

function Streak(props: StreakInput): React.JSX.Element {
  const { counter } = props

  return <div className="streak-container manage-goal-item">
    <h1> {counter === 0 ? null : counter} </h1>
    <img
      src={counter === 0 ? fireUnlitImg : fireLitImg}
      alt="Streak icon"
    />
  </div>;
}

export default Streak;