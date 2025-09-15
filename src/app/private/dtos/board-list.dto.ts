import { CardResponseDto } from './card.dto';
import { UserResponseDto } from './user.dto';

export interface CreateBoardListRequestDto {
  boardId: number;
  name: string;
}

export interface BoardListResponseDto {
  archived: boolean;
  archivedAt: Date;
  archivedBy: UserResponseDto;
  name: string;
  id: number;
  position: number;
  cards: CardResponseDto[];
}
