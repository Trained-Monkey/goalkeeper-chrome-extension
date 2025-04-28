import React, { useEffect, useState } from 'react';
import './App.css';
import GoalList from './components/GoalList/GoalList';
import { TYPES } from './constants/Goal';
import Streak from './components/Streak/Streak';
import AddGoal from './components/AddGoal/AddGoal';
import GoalInput from './interface/GoalInput';
import { getFromStoragePromise, storeInStorage } from './utils/ChromeStorage';

function App() {
  const emptyList: any[] = [];
  const [storedGoals, setStoredGoals] = useState(emptyList);

  const [loaded, setLoaded] = useState(false);

  // Get our stored goals data from storage
  useEffect(() => {
    getFromStoragePromise({ 'goals': [] })?.then((result) => {
      const goals = result['goals'].map(((goal: any) => {
        const result = {...goal}
        result.lastCompleted = new Date(goal.lastCompleted.toString());
        return result;
      }))
      setStoredGoals(goals);
      setLoaded(true);
      console.log(result['goals']);
    })

  }, [])

  useEffect(() => {
    if (loaded){
      const formattedGoals = storedGoals.map((goal: any) => {
        const result = {...goal};
        result.lastCompleted = goal.lastCompleted.toString();
        return result;
      })
      storeInStorage({goals: formattedGoals});
    }
    
  }, [storedGoals, loaded])

  // Attaching our callbacks for marking and deleting goal
  const testData: GoalInput[] =
    storedGoals.map((prev, index) => {
      return {
        ...prev,
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
              if (prevIndex === index) {
                return nextGoalState
              }

              return oldGoalState;
            })
          })
        }
      }
    })

  const addGoal = (newGoal: GoalInput) => {
    setStoredGoals(prev => [...prev, newGoal])
  }

  return (
    <div className="app">

      <GoalList goals={testData} />
      <div className="manage-goal-container">
        <Streak goals={testData} />
        <AddGoal addGoalCallback={addGoal} />
      </div>

    </div>
  );
}

export default App;
