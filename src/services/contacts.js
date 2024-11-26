import { contactsAllCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';
// import mongoose from 'mongoose';

export const getAllContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = contactsAllCollection.find({ userId });

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.maxEmail) {
    contactsQuery.where('email').lte(filter.maxEmail);
  }
  if (filter.minEmail) {
    contactsQuery.where('email').gte(filter.minEmail);
  }
  if (filter.maxPhoneNumber) {
    contactsQuery.where('phoneNumber').lte(filter.maxPhoneNumber);
  }
  if (filter.minPhoneNumber) {
    contactsQuery.where('phoneNumber').gte(filter.minPhoneNumber);
  }

  const [contactsCount, contacts] = await Promise.all([
    contactsAllCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await contactsAllCollection.findOne({
    _id: contactId,
    userId,
  });
  return contact;
};

export const createContact = async (payload) => {
  // console.log('Creating contact with payload:', payload);
  const contact = await contactsAllCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, { userId }, options = {}) => {//contactId, payload, { userId }, options = {}
  // console.log('Update Contact Service:');
  // console.log('Contact ID:', contactId);
  // console.log('Payload:', payload);
  // console.log('User ID:', userId);

  const rawResult = await contactsAllCollection.findOneAndUpdate(
    // { _id: mongoose.Types.ObjectId(contactId), userId },
    // { $set: payload },
    // {
      { _id: contactId, userId },
      { ...payload },
      {
      new: true,
      includeResultMetadata: true,
      ...options,
      // upsert: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,//contact
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async filter => {
  return await contactsAllCollection.findOneAndDelete(filter);
};
