import { Component, input } from '@angular/core';
import { Board } from '../../models/board.model';

@Component({
  selector: 'todo-board-card',
  templateUrl: './board-card.component.html',
  styleUrl: './board-card.component.scss',
})
export class BoardCardComponent {
  board = input<Board>();
}
