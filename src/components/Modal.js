"use strict";

import React from "react";
// import PropTypes from "prop-types";
import ReactModal from "react-modal";

ReactModal.setAppElement("#app");

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true
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

  render() {
    return (
      <ReactModal
        isOpen={this.state.showModal}
        onRequestClose={this.closeModal}
        contentLabel={this.props.title}
      >
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={this.closeModal}
        >
          Close
        </button>

        {this.props.children}
      </ReactModal>
    );
  }
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
