import { SprintCreateRequest } from './sprint.dto';
import { UserResponse } from './user.dto';

export interface BoardCreateRequest {
  name: string;
  prefix: string;
  sprints: SprintCreateRequest[];
}

export interface BoardResponse {
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date;
  archivedBy: UserResponse;
  name: string;
  id: number;
  prefix: string;
}
