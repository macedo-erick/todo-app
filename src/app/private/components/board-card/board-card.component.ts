import { Component, input } from '@angular/core';
import { BoardsResponseDto } from '../../dtos/board.dto';

@Component({
  selector: 'todo-board-card',
  templateUrl: './board-card.component.html',
  styleUrl: './board-card.component.scss'
})
export class BoardCardComponent {
  board = input<BoardsResponseDto>();
}
