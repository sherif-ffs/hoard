import { Schema, model } from 'mongoose';
import { ItemInterface } from '../interfaces/ItemInterface';

const itemSchema = new Schema<ItemInterface>({
  // itemId: {
  //   type: Number,
  //   required: true,
  //   unique: true,
  // },
  author: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  collectionId: {
    type: String,
    required: false,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  tags: {
    type: [],
    required: false,
  },
  likes: {
    type: Number,
    required: true,
  },
  isPrivate: {
    type: Boolean,
    required: true,
  },
});

export default model('Item', itemSchema);
