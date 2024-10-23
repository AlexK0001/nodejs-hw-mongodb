 import { Schema, mongoose } from 'mongoose';

 const contactsSchema = new Schema(
   {
     name: {
       type: String,
       required: true,
     },
     phoneNumber: {
       type: String,
       required: true,
     },
     email: {
       type: String,
       required: true,
     },
     isFavourite : {
       type: Boolean,
       required: true,
       default: false,
     },
     gender: {
        type: String,
        required: true,
        enum: ['work', 'home', 'personal'],
        default: 'personal',
      },
   },
   {
     timestamps: true,
     versionKey: false,
   },
 );

 export const contacts = mongoose.model('Contact', contactsSchema, 'contacts');

