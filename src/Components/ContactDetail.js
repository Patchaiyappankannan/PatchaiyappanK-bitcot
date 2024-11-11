import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ContactDetail = ({ selectedContact, handleCloseModal }) => {
  if (!selectedContact) return null; 

  return (
    <Modal show={true} onHide={handleCloseModal} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Contact Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>Name: {selectedContact.name}</h5>
          <h5>Phone: {selectedContact.mobile}</h5>
          <h5>Email: {selectedContact.email}</h5>
          <h5>Address: {selectedContact.address}</h5>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactDetail;
