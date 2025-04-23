import { TYPES } from "../constants/Goal"

interface GoalInput {
    name: string,
    type: TYPES,
    last_completed: Date,
    callback: any
}

export default GoalInput;