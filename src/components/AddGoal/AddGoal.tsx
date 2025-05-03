import React, { useState } from "react";
// Components & Interfaces
import AddGoalModal from "./AddGoalModal/AddGoalModal";
import Goal from "../../interface/Goal";
// Misc
import "./AddGoal.css";

export interface AddGoalInput {
  // Function to call to add goal obtained from form.
  addGoalCallback: (newGoal: Goal) => void
}

function AddGoal(prop: AddGoalInput): React.JSX.Element {
  const [modalState, setModalState] = useState(false);
  const { addGoalCallback } = prop;

  function openModal() {
    document.body.classList.add('modal-open');
    setModalState(true);
  }

  function closeModalOnClick(event: any) {
    if (event.target === event.currentTarget) {
      document.body.classList.remove('modal-open');
      setModalState(false);
    }
  }

  function closeModal() {
    setModalState(false);
  }

  return (
    <div className="manage-goal-item add-goal" >
      <button className="btn btn-primary" onClick={openModal}>
        Add Goal
      </button>

      {modalState && <AddGoalModal
        closeModal={closeModal}
        closeModalOnClick={closeModalOnClick}
        addGoalCallback={addGoalCallback}
      />}
    </div>
  )
}

export default AddGoal;