import { contacts } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const allContacts = await contacts.find();
  return allContacts;
};

export const getContactById = async (contactId) => {
  const contact = await contacts.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await contacts.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await contacts.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      upsert: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async filter => {
  return contacts.findOneAndDelete(filter);
};
