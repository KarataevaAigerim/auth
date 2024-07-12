import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from './ResendModal.module.scss';

const ResendModal = ({ show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered={true}
      dialogClassName={style.modal}
    >
      <Modal.Body className={style.modalBody} >
        <h5>The email has been sent again to your email address</h5>
        <p>don't forget to check your "spam" folder</p>
        <Button  className={style.gotBtn} variant="secondary" onClick={handleClose}>
          Got it!
        </Button>
      </Modal.Body>
    
        
      
    </Modal>
  );
};

export default ResendModal;