import { contacts } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const allContacts = await contacts.find();
  return allContacts;
};

export const getContactById = async (contactId) => {
  const contact = await contacts.findById(contactId);
  return contact;
};
