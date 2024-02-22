import { Component, input } from '@angular/core';
import { Card } from '../../models/card.model';

@Component({
  selector: 'todo-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  card = input<Card>();
}
