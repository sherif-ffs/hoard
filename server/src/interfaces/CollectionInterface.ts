import { TagInterface } from './TagInterface';

export interface CollectionInterface {
  userId: string;
  title: string;
  description: string;
  tags?: Array<TagInterface> | null;
  items?: Array<string> | null;
  likes: number;
  isPrivate: boolean;
}
