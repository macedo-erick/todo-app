import { SprintStatus } from '../enums/sprint-status';

export interface Sprint {
  id: string;
  startDate: Date;
  endDate: Date;
  status: SprintStatus;
}
