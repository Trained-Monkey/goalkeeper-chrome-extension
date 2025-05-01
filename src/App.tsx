import React, { useEffect, useState } from 'react';
// Components
import GoalList from './components/GoalList/GoalList';
import Streak from './components/Streak/Streak';
import AddGoal from './components/AddGoal/AddGoal';
// Interfaces
import GoalInput from './interface/GoalInput';
import Goal from './interface/Goal';
// Misc
import { getFromStoragePromise, storeInStorage } from './utils/ChromeStorage';
import './App.css';

function App() {
  const emptyList: any[] = [];
  const [storedGoals, setStoredGoals] = useState(emptyList);

  const [loaded, setLoaded] = useState(false);

  // Get our stored goals data from storage
  useEffect(() => {
    getFromStoragePromise({ 'goals': [] })?.then((result) => {
      const goals = result['goals'].map(((goal: any) => {
        const result = { ...goal }
        result.lastCompleted = new Date(goal.lastCompleted.toString());
        return result;
      }))
      setStoredGoals(goals);
      setLoaded(true);
    })

  }, [])

  useEffect(() => {
    if (loaded) {
      const formattedGoals = storedGoals.map((goal: any) => {
        const result = { ...goal };
        result.lastCompleted = goal.lastCompleted.toString();
        return result;
      })
      storeInStorage({ goals: formattedGoals });
    }

  }, [storedGoals, loaded])

  // Attaching our callbacks for marking and deleting goal
  const goalsWithCallback: GoalInput[] =
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
              console.log(oldGoalState, nextGoalState);
              if (prevIndex === index) {
                return nextGoalState
              }

              return oldGoalState;
            })
          })
        }
      }
    })

  console.log(goalsWithCallback);

  const addGoal = (newGoal: Goal) => {
    setStoredGoals(prev => [...prev, {
      ...newGoal,
      // These two callbacks will be automatically attached once component is
      // reloaded
      finishedCallback: () => {
        console.log("New callback not attached")
      },
      deletionCallback: () => { }
    }])
  }

  return (
    <div className="app">

      <GoalList goals={goalsWithCallback} />
      <div className="manage-goal-container">
        <Streak goals={storedGoals} />
        <AddGoal addGoalCallback={addGoal} />
      </div>

    </div>
  );
}

export default App;
