import React, { FC, ChangeEvent, useState} from 'react';
import { Action, Contact } from '../types';
import { Button, Form } from 'react-bootstrap';

interface ContactFormProps {
  dispatch: React.Dispatch<Action>;
  dataToEdit: Contact | undefined;
  toggleModal: () => void;
}

const ContactForm: FC<ContactFormProps> = ({  dispatch, dataToEdit, toggleModal}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [contact, setContact] = useState({
    firstName: dataToEdit?.firstName ? dataToEdit.firstName : '',
    middleName: dataToEdit?.middleName ? dataToEdit.middleName : '',
    lastName:  dataToEdit?.lastName ? dataToEdit.lastName : '',
    homeNumber: dataToEdit?.homeNumber ? dataToEdit.homeNumber : '',
    phoneNumber: dataToEdit?.phoneNumber ? dataToEdit.phoneNumber : '',
    address: dataToEdit?.address ? dataToEdit.address : '',
    email:   dataToEdit?.email ? dataToEdit.email : '',
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {firstName, middleName, lastName, homeNumber, phoneNumber, address, email} = contact;
    if (
      firstName.trim() === '' ||
      middleName.trim() === '' ||
      lastName.trim() === '' ||
      homeNumber.trim() === '' ||
      phoneNumber.trim() === ''||
      address.trim() === ''||
      email.trim() === ''
    ) {
      setErrorMessage('All the fields are required.');
      return;
    } else if (phoneNumber.length < 3 || homeNumber.length < 3) {
      setErrorMessage('Please enter a phone number with more than 3 numbers.');
      return;
    } 
    if (!dataToEdit) {
      dispatch({
        type: 'ADD_CONTACT',
        payload: {
          id: Date.now(),
          ...contact
        }
      });
      setContact({
        firstName: '',
        middleName: '',
        lastName: '',
        homeNumber: '',
        phoneNumber: '',
        address: '',
        email: '',
      });
      setErrorMessage('');
    } else {
      dispatch({
        type: 'UPDATE_CONTACT',
        payload: {
          id: dataToEdit.id,
          updates: {
            id: Date.now(),
            ...contact
          }
        }
      });
      toggleModal();
    }
  };

  return (
    <Form onSubmit={handleOnSubmit} className="contact-form">
      <h3 className="mb-3">Добавить новый контакт</h3>
      {errorMessage && <p className='errorMsg'>{errorMessage}</p>}
      <Form.Group controlId="firstName">
        <Form.Label>Имя</Form.Label>
        <Form.Control
          name="firstName"
          value={contact.firstName}
          type="text"
          placeholder="Напишите имя, например: Иван"
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId="middleName">
        <Form.Label>Отчество</Form.Label>
        <Form.Control
          name="middleName"
          value={contact.middleName}
          type="text"
          placeholder="Напишите отчество, например: Иванович"
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Фамилия</Form.Label>
        <Form.Control
          name="lastName"
          value={contact.lastName}
          type="text"
          placeholder="Напишите фамилию, например: Иванов"
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId="homeNumber">
        <Form.Label>Домашний номер телефона</Form.Label>
        <Form.Control
          name="homeNumber"
          value={contact.homeNumber}
          type="text"
          placeholder="Напишите домашний номер телефона"
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId="phoneNumber">
        <Form.Label>Мобильный номер телефона</Form.Label>
        <Form.Control
          name="phoneNumber"
          value={contact.phoneNumber}
          type="text"
          placeholder="Напишите мобильный номер телефона"
          onChange={handleOnChange}
        />
         <Form.Group controlId="email">
        <Form.Label>Адрес электронной почты</Form.Label>
        <Form.Control
          name="email"
          value={contact.email}
          type="email"
          placeholder="Напишите адрес электронной почты"
          onChange={handleOnChange}
        />
      </Form.Group>
      </Form.Group>
      <Form.Group controlId="address">
        <Form.Label>Адрес проживания</Form.Label>
        <Form.Control
          name="address"
          value={contact.address}
          type="text"
          placeholder="Напишите адрес фактического проживания"
          onChange={handleOnChange}
        />
      </Form.Group>
     
  <div className="d-flex justify-content-end">
<Button variant='primary' type='submit' className='submit-btn'>
  {dataToEdit ? 'Обновить контакт' : 'Добавить контакт'}
</Button>
      </div>
    </Form>
  );
};

export default ContactForm;