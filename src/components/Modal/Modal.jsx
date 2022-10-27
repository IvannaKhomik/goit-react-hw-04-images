import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContent, ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ url, tag, onCloseModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return window.removeEventListener('keydown', onKeyDown);
  }, []);

  const onKeyDown = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };

  const onClickModal = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <Overlay onClick={onClickModal}>
      <ModalContent>
        <ModalImg src={url} alt={tag} />
      </ModalContent>
    </Overlay>,
    modalRoot
  );
};
