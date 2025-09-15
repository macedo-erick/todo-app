import { CreateSprintRequestDto } from './sprint.dto';
import { User } from '../models/user.model';

export interface CreateBoardRequestDto {
  name: string;
  prefix: string;
  sprints: CreateSprintRequestDto[];
}

export interface BoardResponseDto {
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date;
  archivedBy: User;
  name: string;
  id: number;
  prefix: string;
}
