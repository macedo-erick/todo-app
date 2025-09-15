import { Card } from './card.model';
import { User } from './user.model';

export interface Activity {
  id: number;
  card: Card;
  author: User;
  type: ActivityType;
  detailsJson: string;
}

export enum ActivityType {
  MOVE_LIST = 'MOVE_LIST',
  CHANGE_PRIORITY = 'CHANGE_PRIORITY',
  CHANGE_STORY_POINTS = 'CHANGE_STORY_POINTS',
  COMMENT_ADDED = 'COMMENT_ADDED',
  ATTACHMENT_ADDED = 'ATTACHMENT_ADDED',
  CHECKLIST_ITEM_DONE = 'CHECKLIST_ITEM_DONE',
  TITLE_UPDATED = 'TITLE_UPDATED',
  DESCRIPTION_UPDATED = 'DESCRIPTION_UPDATED',
  CREATE_CARD = 'CREATE_CARD',
  ARCHIVE_CARD = 'ARCHIVE_CARD',
  CHANGE_TIME_SPENT = 'CHANGE_TIME_SPENT'
}
