import { Board } from './board.model';

export interface Sprint {
  id: number;
  board: Board;
  name: string;
  startDate: Date;
  endDate: Date;
  status: SprintStatus;
}

export enum SprintStatus {
  PLANNED = 'PLANNED',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED'
}
