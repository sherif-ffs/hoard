export interface ItemInterface {
  author: string;
  userId: string;
  name: string;
  description: string;
  collectionId: string | null;
  url: string;
  image?: string | null;
  tags?: Array<String> | null;
  likes: number | null;
  isPrivate: boolean;
}
