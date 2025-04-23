import React from "react";
import Goal from "./Goal";

function GoalList(): React.JSX.Element {

    return (
        <div>
            <h1>Goal List</h1>
            <Goal name="Drink water" expiry={1} type = {1}/>
        </div>
        
    )
}

export default GoalList;