import { User } from './user.model';

export interface Board {
  id: number;
  name: string;
  prefix: string;
  archived: boolean;
  archivedAt: Date;
  archivedBy: User;
  lastCardNumber: number;
}

export interface BoardMember {
  boardId: number;
  userId: number;
  board: Board;
  user: User;
  role: BoardRole;
}

export enum BoardRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  VIEWER = 'VIEWER'
}
