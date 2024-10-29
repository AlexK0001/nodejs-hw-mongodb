import { Router } from "express";
import { getAllContacts, getContactById } from './services/contacts.js';
import createHttpError from 'http-errors';

const router = Router();

export default router;

export const getContactsController = async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  };

  export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    // Відповідь, якщо контакт не знайдено
	if (!contact) {
        throw createHttpError('Contact not found');
	}

	// Відповідь, якщо контакт знайдено
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  };