import { Schema } from 'mongoose';
import { UserInterface } from '../interfaces/UserInterface';

const userSchema = new Schema<UserInterface>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
  github: {
    type: String,
    required: false,
  },
  joinedDate: {
    type: Number,
    required: true,
    default: Date.now,
  },
  collections: {
    type: [],
    required: true,
  },
  following: {
    type: [],
    required: true,
  },
});
