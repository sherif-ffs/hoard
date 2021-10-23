import { TagInterface } from './TagInterface';

export interface ItemInterface {
  _id: string;
  author: string;
  name: string;
  description: string;
  userId: string;
  collectionId: string | null;
  url: string;
  image?: string | null;
  tags?: Array<TagInterface> | null;
  likes: number;
  isPrivate: boolean;
}
