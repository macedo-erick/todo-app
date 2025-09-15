import { CardChecklist } from './card-checklist.model';
import { Card } from './card.model';

export interface CardChecklistItem {
  id: number;
  checklist: CardChecklist;
  card: Card;
  name: string;
  finished: boolean;
  position: number;
}
