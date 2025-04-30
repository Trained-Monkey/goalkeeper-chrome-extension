import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import "./AddGoalModal.css";


function AddGoalModal(props: any) {
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
    <div onClick={closeModal} className="modal fade show bd-example-modal-lg" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          ...
        </div>
      </div>
      {createPortal(<div onClick={closeModal} className="modal-backdrop show"></div>, document.body)}
    </div>)
}

export default AddGoalModal;