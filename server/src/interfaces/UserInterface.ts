import { CollectionInterface } from './CollectionInterface';

export interface UserInterface {
  name: string;
  email: string;
  role: string;
  twitter: string;
  portfolio: string;
  github: string;
  joinedDate: Date;
  userId: number;
  collections: Array<CollectionInterface>;
}
