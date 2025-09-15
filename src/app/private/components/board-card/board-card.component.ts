import { Component, input } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { BoardResponseDto } from '../../dtos/board.dto';

@Component({
  selector: 'todo-board-card',
  templateUrl: './board-card.component.html',
  styleUrl: './board-card.component.scss',
  standalone: true,
  imports: [RouterLink, MatCard, MatRipple, MatCardContent]
})
export class BoardCardComponent {
  board = input<BoardResponseDto>();
}
