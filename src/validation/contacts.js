import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.number().integer().min(6).max(15).required(),
  email: Joi.string().email().min(3).max(20).required(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').min(3).max(20).required(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.number().integer().min(6).max(15),
    email: Joi.string().email().min(3).max(20),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').min(3).max(20),
  });