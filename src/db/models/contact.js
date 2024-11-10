import { Schema, mongoose } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [20, 'Name cannot exceed 20 characters'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      validate: {
        validator: function(v) {
          return /\+?\d{10,15}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    email: {
      type: String,
      // required: [true, 'Email is required'],
      match: [/\S+@\S+\.\S+/, 'Email format is invalid']
    },
    isFavourite : {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: [true, 'Contact type is required'],
      enum: {
        values: ['work', 'home', 'personal'],
        message: '{VALUE} is not a valid contact type'
      },
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const contactsAllCollection = mongoose.model('Contact', contactsSchema, 'contacts');
