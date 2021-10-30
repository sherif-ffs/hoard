import { Schema, model } from 'mongoose';
import { CollectionInterface } from '../interfaces/CollectionInterface';

const collectionSchema = new Schema<CollectionInterface>({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
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
  items: {
    type: [],
    required: false,
  },
});

export default model('Collection', collectionSchema);