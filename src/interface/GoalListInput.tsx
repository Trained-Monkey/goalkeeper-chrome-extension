import { TYPES } from "../constants/Goal";
import GoalInput from "./GoalInput";

interface GoalListInput {
    goals: {
        name: string,
        type: TYPES
        lastCompleted: Date
    }[]
}

export default GoalListInput;