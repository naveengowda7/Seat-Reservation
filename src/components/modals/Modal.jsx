import React, { useRef } from "react";
import ReactDOM from "react-dom";
import "./modal.css";

const Modal = ({ isVisible, onClose, children, isDanger }) => {
  if (!isVisible) return null;

  const modalRef = useRef();

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" ref={modalRef} onClick={closeModal}>
      <div
        className={`${"modal-container"}  ${isDanger ? "danger" : "success"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-button" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
