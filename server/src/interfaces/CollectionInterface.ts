import { TagInterface } from './TagInterface';
import { ItemInterface } from './ItemInterface';

export interface CollectionInterface {
  collectionId: number;
  userId: number;
  url: string;
  title: string;
  tags?: Array<TagInterface> | null;
  items?: Array<ItemInterface> | null;
  likes: number;
}
