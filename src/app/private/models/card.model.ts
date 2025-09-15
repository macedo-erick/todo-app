import { Board } from './board.model';
import { BoardList } from './board-list.model';
import { Sprint } from './sprint.model';
import { User } from './user.model';

export interface Card {
  id: number;
  board: Board;
  list: BoardList;
  sprint: Sprint;
  name: string;
  description: string;
  position: number;
  priority: CardPriority;
  assignee: User;
  storyPoints: number;
  timeSpent: number;
  archived: boolean;
  key: string;
  archivedAt: Date;
  archivedBy: User;
  cardType: CardType;
}

export enum CardPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export enum CardType {
  STORY = 'STORY',
  TASK = 'TASK',
  BUG = 'BUG',
  SPIKE = 'SPIKE'
}
