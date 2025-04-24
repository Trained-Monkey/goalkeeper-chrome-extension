import { TYPES } from "../constants/Goal"

interface GoalInput {
    name: string,
    type: TYPES,
    lastCompleted: Date,
    deletionCallback: any
}

export default GoalInput;