import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import "./AddGoalModal.css";


function AddGoalModal(props: any) {
    const modalTriggered = props.modalState;
    const closeModal = props.closeModal;

    const myRef = useRef(null);

  useEffect(() => {
    // Access the DOM node using myRef.current
    // if (myRef.current) {
    //   // Perform operations on the DOM node
    //   console.log(myRef.current);
    //   // @ts-ignore
    //   console.log(myRef.current.modal('show'));
    // //   myRef.current.focus();
    // }
  }, []);

    return (
        <div className="modal fade" tabIndex={-1} id="addGoalModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Modal title</h4>
                </div>
                <div className="modal-body">
                  <p>One fine body&hellip;</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>)
}

export default AddGoalModal;