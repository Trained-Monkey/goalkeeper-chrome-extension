import React from "react";
import Goal from "./Goal/Goal";
import GoalInput from "../../interface/GoalInput";
import { TYPES } from "../../constants/Goal";

function GoalList(): React.JSX.Element {
    const dummyData: GoalInput = {
        name: "Drink water",
        type: TYPES.DAILY,
        lastCompleted: new Date(),
        deletionCallback: () => {}
    }
    return (
        <div>
            <h1>Goal List</h1>
            <ul className="list-group">
                <Goal {...dummyData}/>
            </ul>
        </div>
    )
}

export default GoalList;