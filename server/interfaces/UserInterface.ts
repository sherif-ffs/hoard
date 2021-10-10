import { CollectionInterface } from './CollectionInterface';

export interface UserInterface {
  userId: number;
  name: string;
  email: string;
  role: string;
  twitter: string;
  portfolio: string;
  github: string;
  joinedDate: number;
  collections: Array<CollectionInterface>;
  following: Array<UserInterface>;
}
