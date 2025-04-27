import React from 'react';
import './App.css';
import GoalList from './components/GoalList/GoalList';
import GoalListInput from './interface/GoalListInput';
import { TYPES } from './constants/Goal';
import Streak from './components/Streak/Streak';
import AddGoal from './components/AddGoal/AddGoal';

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
    <div className="app">
      <GoalList {...testData}/>
      <div className="manage-goal-container">
        <Streak {...{streakCounter: 10}}/>
        
        <AddGoal/>
        

      </div>
      
    </div>
  );
}

export default App;
