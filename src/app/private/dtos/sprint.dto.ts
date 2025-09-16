import { SprintStatus } from '../models/sprint.model';

export interface SprintCreateRequest {
  boardId?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  status: SprintStatus;
}
