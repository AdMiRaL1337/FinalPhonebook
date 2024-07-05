import { Contact } from '../types';

export const exportToCsv = (contacts: Contact[]): string => {
  const csvHeader = 'firstName,middleName,lastName,homeNumber,phoneNumber,email,address\n';
  const csvRows = contacts.map(contact => 
    `${contact.firstName},${contact.middleName},${contact.lastName},${contact.homeNumber},${contact.phoneNumber},${contact.email},${contact.address}`
  ).join('\n');
  return csvHeader + csvRows;
};

export const importFromCsv = (csvData: string): Contact[] => {
  const lines = csvData.split('\n');
  const contacts: Contact[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() !== '') { 
      const [firstName, middleName, lastName, homeNumber, phoneNumber, email, address] = line.split(',');
      contacts.push({
          firstName, middleName, lastName, homeNumber, phoneNumber, email, address,
          id: 0
      });
    }
  }
  return contacts;
};