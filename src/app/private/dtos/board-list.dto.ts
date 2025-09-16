import { UserResponse } from './user.dto';

export interface BoardListCreateRequest {
  name: string;
}

export interface BoardListResponse {
  archived: boolean;
  archivedAt: Date;
  archivedBy: UserResponse;
  name: string;
  id: number;
  position: number;
}
