import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';

function DeleteButtonComponent(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.jobtitle ? props.jobtitle.title : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Oops, you're about to delete this Job title</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await props.deleteJobtitle(props.jobtitle.id);
              handleClose();
            }}
          >
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteButtonComponent;
