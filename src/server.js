import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from "dotenv";
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

dotenv.config();

const PORT = Number(env('PORT', '3001'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    // Відповідь, якщо контакт не знайдено
	if (!contact) {
	  res.status(404).json({
		  message: 'Contact not found'
	  });
	  return;
	}

	// Відповідь, якщо контакт знайдено
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
    next()
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
    next()
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
