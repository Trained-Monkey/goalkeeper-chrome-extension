import Goal from "./Goal";

interface AddGoalModalInput {
    addGoalCallback: (goal: Goal) => void
    closeModal: () => void
    closeModalOnClick: (event: any) => void
}

export default AddGoalModalInput;