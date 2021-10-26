import { TagInterface } from './TagInterface';

export interface ItemInterface {
  _id: string;
  author: string;
  name: string;
  description: string;
  userId: string;
  collectionIds: Array<string> | null;
  collectionTitles: Array<string> | null;
  url: string;
  image?: string | null;
  collections: Array<any> | null;
  tags?: Array<TagInterface> | null;
  likes: number;
  isPrivate: boolean;
}
