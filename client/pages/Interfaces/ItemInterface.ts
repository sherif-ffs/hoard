export interface ItemInterface {
  _id: string;
  author: string;
  userId: string;
  name: string;
  description: string;
  collections: Array<{ title: string; value: string }>;
  url: string;
  image?: string | null;
  imageID?: string | null;
  tags?: Array<String> | null;
  likes: number | null;
  isPrivate: boolean;
}
