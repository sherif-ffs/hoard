import { TagInterface } from './TagInterface';

export interface ItemInterface {
  itemId: number;
  userId: number;
  collectionId: number | null;
  url: string;
  image?: string | null;
  tags?: Array<TagInterface> | null;
}
