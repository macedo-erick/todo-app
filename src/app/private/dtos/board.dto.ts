import { CreateSprintRequestDto } from './sprint.dto';
import { UserResponseDto } from './user.dto';

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
  archivedBy: UserResponseDto;
  name: string;
  id: number;
  prefix: string;
}
