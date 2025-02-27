import React, { FC } from 'react';
import { Contact, Action } from '../types';
import ContactItem from './ContactItem';

interface ContactListProps {
  contacts: Contact[];
  handleEdit: (id: number) => void;
  dispatch: React.Dispatch<Action>;
}
const ContactList: FC<ContactListProps> = ({ contacts, handleEdit, dispatch }) => {
  return (
    <div className='contacts-list'>
      <h3 className='contacts-list-title'>Список контактов</h3>
      <div className='contacts-list-table-container'>
        <table className='contacts-list-table'>
          <thead className='contacts-list-header'>
            <tr>
              <th>Имя</th>
              <th>Отчество</th>
              <th>Фамилия</th>
              <th>Домашний номер телефона</th>
              <th>Мобильный номер телефона</th>
              <th>Адрес электронной почты</th>
              <th>Адрес фактического проживания</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <ContactItem
              key={contact.id}
              {...contact}
              handleEdit={handleEdit}
              dispatch={dispatch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ContactList;