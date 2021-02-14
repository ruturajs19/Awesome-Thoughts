import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { reduxActions } from "../../../State/AwesomeThoughts.actions";
import "./Modal.css";

function Modal({ modalText, closeModal }) {
  if (!modalText) return null;

  return ReactDOM.createPortal(
    <>
      <div className={"backdrop-modal"} />
      <div className="modal-content">
        <div className="modal-body">{modalText}</div>
        <div className="modal-footer">
          {modalText !== "Loading..." && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </>,
    document.getElementById("modal-portal")
  );
}

const mapStateToProps = (state) => {
  return {
    modalText: state.modalText,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch({ type: reduxActions.CloseModal }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
