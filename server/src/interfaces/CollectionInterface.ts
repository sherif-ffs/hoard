export interface CollectionInterface {
  userId: string;
  title: string;
  description: string;
  tags?: Array<string> | null;
  items?: Array<string> | null;
  likes: number;
  isPrivate: boolean;
}
