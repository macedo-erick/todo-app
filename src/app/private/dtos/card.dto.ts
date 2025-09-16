import { Sprint } from '../models/sprint.model';
import { CardPriority, CardType } from '../models/card.model';
import { UserResponse } from './user.dto';

export interface CardCreateRequest {
  name: string;
}

export interface CardResponse {
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
  archivedAt: Date;
  sprint: Sprint;
  assignee: UserResponse;
  storyPoints: number;
  timeSpent: number;
  cardType: CardType;
  name: string;
  key: string;
  priority: CardPriority;
  id: number;
  position: number;
  description: string;
  attachments: CardAttachment[];
  checklists: CardChecklist[];
}

interface CardAttachment {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  fileName: string;
  key: string;
  url: string;
}

interface CardChecklist {
  id: number;
  name: string;
}
