import { Router } from "express";
import {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

const router = Router();

export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = { ...parseFilterParams(req.query), userId: req.user._id };
    const contacts = await getAllContacts({
        userId: req.user._id,
        page,
        perPage,
        sortBy,
        sortOrder,
        filter });

    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  };

  export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId, req.user._id);

    // Відповідь, якщо контакт не знайдено
	if (!contact) {
        throw createHttpError(404, 'Contact not found');
	}

	// Відповідь, якщо контакт знайдено
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  };
  export const createContactController = async (req, res) => {
    const contactData = { ...req.body, userId: req.user._id };
    const contact = await createContact(contactData);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
	}

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
  };

  export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const payload = req.body;
  const result = await updateContact(contactId, { photo: photoUrl }, payload, { userId: req.user._id });

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
  };

  export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;

    const data = await deleteContact({ _id: contactId, userId: req.user._id });

    if (!data) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
  };

  export default router;
