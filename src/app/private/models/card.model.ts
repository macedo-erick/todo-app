import { Checklist } from './checklist.model';
import { Priority } from './priority.model';

export interface Card {
  name: string;
  description: string;
  dueDate: Date;
  finished: boolean;
  checklist: Checklist;
  priority: Priority;
}
