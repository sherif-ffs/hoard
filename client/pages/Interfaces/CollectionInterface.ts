import { TagInterface } from './TagInterface';
import { ItemInterface } from './ItemInterface';

export interface CollectionInterface {
  collectionId: string;
  userId: string;
  url: string;
  title: string;
  description: string;
  tags?: Array<TagInterface> | null;
  items?: Array<ItemInterface> | null;
  likes: number;
}
