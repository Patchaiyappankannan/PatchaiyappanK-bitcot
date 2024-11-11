import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrashAlt, FaPlus, FaUserCircle } from 'react-icons/fa';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';

const ContactCard = () => {
  const [contacts, setContacts] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [viewingContact, setViewingContact] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        console.log("Fetched data:", data); 
        
        if (data && Array.isArray(data)) {
          setContacts(data);
        } else {
          console.error("Invalid contact data format");
          setContacts([]); 
        }

      } catch (error) {
        console.error('Error fetching contacts:', error);
        setContacts([]); 
      }
    };

    fetchContacts();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContact(null);
    setViewingContact(false);
  };

  const handleDeleteContact = (id) => {
    setContacts((prevContacts) => prevContacts.filter(contact => contact.id !== id));
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setViewingContact(true);
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setViewingContact(false);
    handleShowModal();
  };

  const handleSaveContact = (updatedContact) => {
    if (updatedContact.id) {
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === updatedContact.id ? updatedContact : contact
        )
      );
    } else {
      setContacts([...contacts, { ...updatedContact, id: contacts.length + 1 }]);
    }
    handleCloseModal();
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Contacts:", filteredContacts); // Log filtered contacts

  return (
    <Container className="mt-5" style={{ marginLeft: '0' }}>
      <Card style={{ width: '400px', backgroundColor: '#000', color: '#fff' }} className="p-3 rounded">
        <Card.Header
          className="text-center bg-primary text-white"
          onClick={handleShowModal}
          style={{ cursor: 'pointer' }}
        >
          <h5>All Contacts <FaPlus /></h5>
        </Card.Header>

        <div className="my-3" />

        <Form className="mb-3 d-flex justify-content-center">
          <Form.Control
            type="text"
            placeholder="Search Contact"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '80%' }}
          />
        </Form>

        {filteredContacts.length === 0 ? (
          <div className="text-center text-muted">No contacts found</div>
        ) : (
          filteredContacts.map((contact) => (
            <Card key={contact.id} className="mb-2">
              <Card.Body className="d-flex align-items-center">
                <div style={{ width: '60px' }}>
                  <div>{contact.id}</div>
                </div>

                <div className="d-flex align-items-center" style={{ width: '60px' }}>
                  <FaUserCircle size={24} />
                </div>

                <div className="d-flex flex-column ms-3" style={{ width: 'calc(100% - 120px)' }}>
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {contact.name}
                  </div>
                  <div>{contact.mobile}</div>
                </div>

                <div className="ms-auto d-flex">
                  <Button variant="link" className="text-dark" onClick={() => handleViewContact(contact)}><FaEye /></Button>
                  <Button variant="link" className="text-dark" onClick={() => handleDeleteContact(contact.id)}><FaTrashAlt /></Button>
                  <Button variant="link" className="text-dark" onClick={() => handleEditContact(contact)}><FaEdit /></Button>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </Card>


      <ContactList
        contacts={contacts}
        setContacts={setContacts}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        selectedContact={selectedContact}
        handleSaveContact={handleSaveContact}
      />

      {selectedContact && viewingContact && (
        <ContactDetail
          selectedContact={selectedContact}
          handleCloseModal={() => setSelectedContact(null)}
        />
      )}
    </Container>
  );
};

export default ContactCard;
