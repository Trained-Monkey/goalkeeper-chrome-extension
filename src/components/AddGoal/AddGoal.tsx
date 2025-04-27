import React from "react";
import "./AddGoal.css";
import AddGoalInput from "../../interface/AddGoalInput";
import { TYPES } from "../../constants/Goal";
// import { StreakContext } from "../../context/StreakContext";

function AddGoal(prop: AddGoalInput): React.JSX.Element {
    const {addGoalCallback} = prop;

    function handleOnClick() {
        addGoalCallback({
            name: "Added goal",
            type: TYPES.DAILY,
            lastCompleted: new Date(),
            deletionCallback: undefined,
            finishedCallback: undefined
        })
    }

    return (
        <div className="manage-goal-item add-goal">
            <button className="btn btn-primary" onClick={handleOnClick}>
                Add Goal
            </button>
        </div>
        )
}

export default AddGoal;