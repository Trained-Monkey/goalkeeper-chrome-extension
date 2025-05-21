import React, { useState } from "react"
import Button from "../Button/Button"
import Goal from "../../interface/Goal";
import { TYPES } from "../../constants/Goal";
import DatePicker from "react-datepicker";

interface AddModalFormInput {
  addGoal: (goal: Goal) => void,
  closeDialog: () => void
}

function AddModalForm(props: AddModalFormInput) {
  const { addGoal, closeDialog } = props;
  const [startDate, setStartDate] = useState(new Date());

  function handleSubmit(formData: any) {
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

    addGoal(newGoal);
    closeDialog();
  }

  return <>
    <form className="form" action={handleSubmit}>
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
        <div className="modal-footer">
          <Button
            content={"Add Goal"}
            onClick={() => { }}
            type="submit"
          />
          <Button
            content={"Close"}
            onClick={closeDialog}
            isDanger={true}
          />
        </div>
      </div>
    </form>


  </>
}

export default AddModalForm;