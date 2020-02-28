"use strict";

import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

Modal.setAppElement("#app");

export default function LMSModal(props) {
  return (
    <div>
      <Modal
        isOpen={props.openHandel}
        onRequestClose={props.closeHandel}
        contentLabel={props.title}
      >
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={props.closeHandel}
        >
          Close
        </button>

        <h2>{props.title}</h2>
        {props.children}
      </Modal>
    </div>
  );
}

LMSModal.propTypes = {
  title: PropTypes.string.isRequired,
  openHandel: PropTypes.func.isRequired,
  closeHandel: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};
