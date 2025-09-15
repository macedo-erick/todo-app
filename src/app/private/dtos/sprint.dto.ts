import { SprintStatus } from '../models/sprint.model';

export interface CreateSprintRequestDto {
  boardId?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  status: SprintStatus;
}
