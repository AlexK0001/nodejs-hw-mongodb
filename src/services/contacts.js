import { contacts } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await contacts.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await contacts.findById(contactId);
  return contact;
};
