import { CollectionInterface } from './CollectionInterface';

export interface UserInterface {
  name: string;
  email: string;
  role: string;
  twitter: string;
  portfolio: string;
  github: string;
  collections: Array<CollectionInterface>;
}
