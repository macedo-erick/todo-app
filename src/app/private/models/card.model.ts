import { Checklist } from './checklist.model';
import { Priority } from './priority.model';

export interface Card {
  name: string;
  description: string;
  createdDate: Date;
  dueDate: Date;
  timeSpent: number;
  finished: boolean;
  checklist: Checklist;
  priority: Priority;
}
