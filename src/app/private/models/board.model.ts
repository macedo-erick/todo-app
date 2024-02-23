import { List } from './list.model';

export interface Board {
  _id?: string;
  name: string;
  lists: List[];
}
