import Goal from "./Goal";

interface AddGoalInput {
    addGoalCallback: (newGoal: Goal) => void
}

export default AddGoalInput;