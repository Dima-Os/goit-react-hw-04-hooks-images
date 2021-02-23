import { createPortal } from 'react-dom';
import React, { Component } from 'react';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }
  closeModal = e => {
    if (e.code === 'Escape') {
      this.props.togleModal();
    }
  };
  onBackDropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.togleModal();
    }
  };
  render() {
    return createPortal(
      <div className={s.overlay} onClick={this.onBackDropClick}>
        <div className={s.modal}>
          <img src={this.props.URL} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
