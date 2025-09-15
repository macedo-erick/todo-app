import { Card } from './card.model';
import { User } from './user.model';

export interface CardComment {
  id: number;
  card: Card;
  author: User;
  description: string;
}
