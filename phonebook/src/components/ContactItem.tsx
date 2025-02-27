import React, { FC } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Contact, Action } from '../types';

interface ExtraProps {
  handleEdit: (id: number) => void;
 dispatch: React.Dispatch<Action>
}

const ContactItem: FC<Contact & ExtraProps> = ({ id, firstName, middleName, lastName, homeNumber, phoneNumber, address, email, handleEdit, dispatch }) => {
  return (
    <tr>
      <td>{firstName}</td>
      <td>{middleName}</td>
      <td>{lastName}</td>
      <td>{homeNumber}</td>
      <td>{phoneNumber}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>
        <AiFillEdit size={20} onClick={() => handleEdit(id)} color='blue' className='icon' />
      </td>
      <td>
        <AiFillDelete size={20}     onClick={() => {
            const confirmDelete = window.confirm(
              `Вы действительно хотите удалить контакт ${firstName} ${lastName}?`
            );
            if (confirmDelete) {
              dispatch({
                type: 'DELETE_CONTACT',
                payload: { id }
              });
            }
          }} color='red' className='icon' />
      </td>
    </tr>
  );
};
export default ContactItem;