"use strict";

import React from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";

ReactModal.setAppElement("#app");

export default class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

      openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  this.render() {
  return (
    <div>
      <Modal
        isOpen={this.state.showModal}
        onRequestClose={this.state.showModal}
        contentLabel={props.title}
      >
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={this.closeModal}
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
