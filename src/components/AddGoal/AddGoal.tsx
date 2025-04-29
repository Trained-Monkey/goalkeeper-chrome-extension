import React, { useState } from "react";
import "./AddGoal.css";
import AddGoalInput from "../../interface/AddGoalInput";
import { TYPES } from "../../constants/Goal";
import AddGoalModal from "./AddGoalModal/AddGoalModal";
import { createPortal } from "react-dom";
// import { StreakContext } from "../../context/StreakContext";

function AddGoal(prop: AddGoalInput): React.JSX.Element {


    return (
        <div className="manage-goal-item add-goal">
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addGoalModal">
                Add Goal
            </button>

            {/* {modalState && <div> There should be a modal here</div>} */}
            <AddGoalModal/>
            {/* {modalState && createPortal(<AddGoalModal/>, document.body)} */}
        </div>
    )
}

export default AddGoal;