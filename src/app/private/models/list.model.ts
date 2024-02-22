import { Card } from './card.model';

export interface List {
  _id: string;
  name: string;
  cards: Card[];
}
