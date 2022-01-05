import { ItemInterface } from './ItemInterface';

export interface CollectionInterface {
  userId: string;
  title: string;
  author: string;
  description: string;
  tags: Array<String> | null;
  items: Array<ItemInterface> | null;
  likes: number;
  isPrivate: boolean;
  datePublished: Date;
}
