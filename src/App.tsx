import React from 'react';
import './App.css';
import GoalList from './components/GoalList/GoalList';
import GoalListInput from './interface/GoalListInput';
import { TYPES } from './constants/Goal';
import Streak from './components/Streak/Streak';

function App() {
  const testData: GoalListInput = {
    goals: [
      {
        name: "Drink water",
        type: TYPES.DAILY,
        lastCompleted: new Date()
      },
      {
        name: "Drink water1",
        type: TYPES.FORTNIGHTLY,
        lastCompleted: new Date()
      },
      {
        name: "Drink water2",
        type: TYPES.WEEKLY,
        lastCompleted: new Date()
      }
    ]
  }
  return (
    <div className="App">
      <GoalList {...testData}/>
      <Streak {...{streakCounter: 10}}/>
    </div>
  );
}

export default App;
