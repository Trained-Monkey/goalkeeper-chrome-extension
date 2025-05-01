import { TYPES } from "../constants/Goal";

interface Goal {
    name: string,
    type: TYPES,
    lastCompleted: Date
}

export default Goal;
