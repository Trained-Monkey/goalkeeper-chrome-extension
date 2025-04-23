import React from "react";

interface GoalInput {
    name: string,
    type: number,
    expiry: number
}

function Goal(prop: GoalInput): React.JSX.Element {
    const { name, type, expiry }  = prop

    return (
        <div>
            <p> {name} </p>
            <p> {type}</p>
            <p> {expiry} </p>
            <p> Button </p>
        </div>
    )
}

export default Goal;