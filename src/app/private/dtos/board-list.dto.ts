import { User } from '../models/user.model';

export interface CreateBoardListRequestDto {
  boardId: number;
  name: string;
}

export interface BoardListResponseDto {
  archived: boolean;
  archivedAt: Date;
  archivedBy: User;
  name: string;
  id: number;
  position: number;
}
