import React, { useEffect, useState } from "react";
import "./AddGoal.css";
import AddGoalInput from "../../interface/AddGoalInput";
import AddGoalModal from "./AddGoalModal/AddGoalModal";
// import { StreakContext } from "../../context/StreakContext";

function AddGoal(prop: AddGoalInput): React.JSX.Element {

    // 1. Try to debug bootstrap and find out why data-bs-toggle is not working
    // 2. Code up the entire functionality using conditional rendering and
    //    portals

    const [modalState, setModalState] = useState(false);


    function openModal(){
        document.body.classList.add('modal-open');
        setModalState(true);
        
    }

    function closeModal(event: any) {
        if (event.target === event.currentTarget){
            document.body.classList.remove('modal-open');
            setModalState(false);
            
        }
    }

    useEffect(() => {
        console.log(modalState);
    }, [modalState])


    return (
        <div className="manage-goal-item add-goal" >
            <button className="btn btn-primary" onClick={openModal}>
                Add Goal
            </button>

            {modalState && <AddGoalModal closeModal={closeModal}/>}
        </div>
    )
}

export default AddGoal;