import React, { useState } from "react";
import { createPortal } from "react-dom";
// Components
import DatePicker from "react-datepicker";
// Interfaces
import Goal from "../../../interface/Goal";
import { TYPES } from "../../../constants/Goal";
// Misc
import 'react-datepicker/dist/react-datepicker.css';
import "./AddGoalModal.css";

export interface AddGoalModalInput {
  // Function to call to add goal obtained from form
  addGoalCallback: (goal: Goal) => void
  // Forcefully closes the modal
  closeModal: () => void
  // Closes the modal but only if the space outside the modal is clicked
  closeModalIfClicked: (event: any) => void
}

function AddGoalModal(props: AddGoalModalInput) {
  const { closeModal, closeModalIfClicked, addGoalCallback } = props;
  const [startDate, setStartDate] = useState(new Date());

  function submitForm(formData: any) {
    if (formData.get(["goalName"]) === "") {
      alert("Goal name can't be empty");
      return;
    }

    const [day, month, year] = formData.get(["goalStartDate"]).split("/");

    const newGoal: Goal = {
      name: formData.get(["goalName"]),
      type: formData.get(["goalType"]),
      lastCompleted: new Date(year, parseInt(month) - 1, parseInt(day))
    }

    addGoalCallback(newGoal);
    closeModal();
  }
  return (
    <div
      onClick={closeModalIfClicked}
      className="modal fade show bd-example-modal-lg"
      tabIndex={-1}
      role="dialog"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Add a goal
            </h5>

          </div>
          <form className="form" action={submitForm}>
            <div className="modal-body">


              <div className="form-group">
                <label htmlFor="goalName">Goal name</label>
                <input type="text"
                  name="goalName"
                  className="form-control"
                  id="goalName"
                  aria-describedby="emailHelp"
                  placeholder="Enter name" />
              </div>
              <div className="form-group">
                <label htmlFor="goalType">Goal to be completed</label>
                <select className="form-control" name="goalType" id="goalType">
                  {Object.values(TYPES).map((type: string) =>
                    <option key={type}>{type}</option>)
                  }
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="formDate">Start on</label>
                <DatePicker
                  className="form-control"
                  id="formDate"
                  selected={startDate}
                  onChange={(date: Date | null) =>
                    date ? setStartDate(date) : null
                  }
                  dateFormat="dd/MM/YYYY"
                  name="goalStartDate"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Add goal</button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
      {createPortal(<div onClick={closeModal}
        className="modal-backdrop show"
      ></div>, document.body)}
    </div >)
}

export default AddGoalModal;