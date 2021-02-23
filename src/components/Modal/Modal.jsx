import { createPortal } from 'react-dom';
import { useEffect } from 'react';

import PropTypes from 'prop-types';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ URL, togleModal }) {
  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  });
  const closeModal = e => {
    if (e.code === 'Escape') togleModal();
  };
  const onBackDropClick = e => {
    if (e.target === e.currentTarget) togleModal();
  };
  return createPortal(
    <div className={s.overlay} onClick={onBackDropClick}>
      <div className={s.modal}>
        <img src={URL} alt="" />
      </div>
    </div>,
    modalRoot,
  );
}
Modal.propTypes = {
  URL: PropTypes.string.isRequired,
  togleModal: PropTypes.func.isRequired,
};
