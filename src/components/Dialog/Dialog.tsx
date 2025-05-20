import DatePicker from "react-datepicker";
import { TYPES } from "../../constants/Goal";
import React from "react";
import { createPortal } from "react-dom";
import "./Dialog.css";

interface DialogInput {
  title: string,
  isOpen: boolean,
  closeDialog: () => void,
  children?: React.ReactNode
}

function Dialog(prop: DialogInput) {
  const { title, isOpen, closeDialog, children } = prop;

  if (!isOpen) {
    return <></>
  }

  return <>
    <div
      onClick={closeDialog}
      className="modal fade show bd-example-modal-lg"
      tabIndex={-1}
      role="dialog"
    >
      <div
        className="modal-dialog"
        onClick={(event) => { event.stopPropagation() }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {title}
            </h5>
          </div>
          {children}
        </div>
      </div>
    </div >
    {createPortal(
      <div
        className="modal-backdrop show"
      />, document.body)}
  </>
}
export default Dialog;

{/* <form className="form" action={submitForm}>
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
        dateFormat="dd/MM/yyyy"
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
</form> */}