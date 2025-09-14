import { Checklist } from './checklist.model';
import { Comment } from './comment.model';
import { Activity } from './activity.model';
import { Attachment } from './attachment.model';
import { Priority } from '../enums/priority.enum';
import { CardType } from '../enums/card-type.enum';

export interface Card {
  id: number;
  name: string;
  description: string;
  createdDate: Date;
  checklist: Checklist | undefined;
  comments: Comment[];
  activities: Activity[];
  attachments: Attachment[] | undefined;
  priority: Priority;
  storyPoints: number;
  timeSpent: number;
  type: CardType;
  sprintId: string;
}
