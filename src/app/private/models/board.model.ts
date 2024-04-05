import { List } from './list.model';
import { Sprint } from './sprint.model';

export interface Board {
  _id?: string;
  name: string;
  lists: List[];
  sprints: Sprint[];
}
