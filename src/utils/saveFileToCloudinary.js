
import cloudinary from 'cloudinary';
import { env } from './env.js';
import { CLOUDINARY } from '../constants/index.js';
// import {CLOUD_NAME, API_SECRET} from './env.js';
import fs from 'node:fs/promises';

cloudinary.v2.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);//file.path
  await fs.unlink('../uploads/');//file.path
  return response.secure_url;
};