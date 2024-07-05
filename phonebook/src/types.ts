export interface Contact {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    homeNumber: string;
    phoneNumber: string;
    address: string;
    email: string;
  }
  
  export interface Update {
    id: number;
    updates?: Contact;
  }

  export interface Action {
    type: 'ADD_CONTACT' | 'UPDATE_CONTACT' | 'DELETE_CONTACT'
    payload: Contact | Update;
  }