import { Checklist } from './checklist.model';

export interface Card {
  name: string;
  description: string;
  dueDate: Date;
  finished: boolean;
  checklist: Checklist;
}
