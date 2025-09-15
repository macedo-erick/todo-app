import { Board } from './board.model';
import { User } from './user.model';

export interface BoardList {
  id: number;
  board: Board;
  name: string;
  position: number;
  archived: boolean;
  archivedAt: Date;
  archivedBy: User;
}
