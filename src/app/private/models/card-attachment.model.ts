import { Card } from './card.model';
import { User } from './user.model';

export interface CardAttachment {
  id: number;
  card: Card;
  author: User;
  fileName: string;
  key: string;
  url: string;
}
