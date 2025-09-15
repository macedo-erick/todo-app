import { Sprint } from '../models/sprint.model';
import { CardPriority, CardType } from '../models/card.model';
import { UserResponseDto } from './user.dto';

export interface CreateCardRequestDto {
  name: string;
  boardId: number;
  listId: number;
}

export interface CardResponseDto {
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
  archivedAt: Date;
  sprint: Sprint;
  assignee: UserResponseDto;
  storyPoints: number;
  timeSpent: number;
  cardType: CardType;
  name: string;
  key: string;
  priority: CardPriority;
  id: number;
  position: number;
  description: string;
  attachments: CardAttachmentDto[];
  checklists: CardChecklistDto[];
}

interface CardAttachmentDto {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  fileName: string;
  key: string;
  url: string;
}

interface CardChecklistDto {
  id: number;
  name: string;
}
