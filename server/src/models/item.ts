import { Schema, model } from 'mongoose';
import { ItemInterface } from '../interfaces/ItemInterface';

const itemSchema = new Schema<ItemInterface>({
  itemId: {
    type: Number,
    required: true,
    unique: true,
  },
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  collectionId: {
    type: Number,
    required: true,
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
});

export default model('Item', itemSchema);
