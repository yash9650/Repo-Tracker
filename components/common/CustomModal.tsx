import React, { ReactNode } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CustomModal: React.FC<{
  show: boolean;
  onClose: () => void;
  onSave: () => void;
  children: ReactNode;
}> = (props) => {
  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.onSave}>
          Create Repository
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
