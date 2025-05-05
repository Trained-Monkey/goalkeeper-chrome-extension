import React, { useState } from "react";
// Components & Interfaces
import AddGoalModal from "./AddGoalModal/AddGoalModal";
import Goal from "../../interface/Goal";
// Misc
import "./AddGoalButton.css";

export interface AddGoalInput {
  // Function to call to add goal obtained from form.
  addGoalCallback: (newGoal: Goal) => void
}

function AddGoalButton(prop: AddGoalInput): React.JSX.Element {
  const [modalState, setModalState] = useState(false);
  const { addGoalCallback } = prop;

  function openModal() {
    document.body.classList.add('modal-open');
    setModalState(true);
  }

  function closeModalIfClicked(event: any) {
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
        closeModalIfClicked={closeModalIfClicked}
        addGoalCallback={addGoalCallback}
      />}
    </div>
  )
}

export default AddGoalButton;