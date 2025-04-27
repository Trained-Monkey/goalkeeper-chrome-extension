import React, { useState } from 'react';
import './App.css';
import GoalList from './components/GoalList/GoalList';
import GoalListInput from './interface/GoalListInput';
import { TYPES } from './constants/Goal';
import Streak from './components/Streak/Streak';
import AddGoal from './components/AddGoal/AddGoal';
import { StreakContext } from './context/StreakContext';
import GoalInput from './interface/GoalInput';

function App() {
  const [storedGoals, setStoredGoals] = useState([
    {
      name: "Drink water",
      type: TYPES.DAILY,
      lastCompleted: new Date(),
    },
    {
      name: "Drink water1",
      type: TYPES.FORTNIGHTLY,
      lastCompleted: new Date(),
    },
    {
      name: "Drink water2",
      type: TYPES.WEEKLY,
      lastCompleted: new Date(),
    }
  ])

  // Attaching our callbacks
  const testData: GoalInput[] = 
    storedGoals.map((prev, index) => {
      return {...prev, 
        deletionCallback: () => {
          setStoredGoals(prevStoredGoals => {
            return prevStoredGoals.filter((_, prevIndex) => {
                return prevIndex !== index;
            });
          })
        },
        finishedCallback: (nextGoalState: GoalInput) => {
          setStoredGoals(prevStoredGoals => {
            return prevStoredGoals.map((oldGoalState, prevIndex) => {
              if (prevIndex == index){
                return nextGoalState
              }

              return oldGoalState;
            })
          })
        }
      }
    })

    const addGoal = (newGoal:GoalInput) => {
      setStoredGoals(prev => [...prev, newGoal])
    }
  

  // Create our raw goals state here
  const [lastCompleted, setLastCompleted] = useState(new Date());

  // Get initial state from chrome cookies

  // Contexts needed
  // - Streak counter
  // - Modal open
  return (
    <div className="app">
      
      <GoalList goals={testData}/>
      <div className="manage-goal-container">
        <Streak goals={testData}/>
        <AddGoal addGoalCallback={addGoal}/>
        
      </div>
      
    </div>
  );
}

export default App;
