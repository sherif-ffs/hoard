import { TagInterface } from './TagInterface';

export interface ItemInterface {
  // itemId: number;
  author: string;
  userId: string;
  collectionId: string;
  url: string;
  image?: string | null;
  tags?: Array<TagInterface> | null;
  likes: number;
  isPrivate: boolean;
}
