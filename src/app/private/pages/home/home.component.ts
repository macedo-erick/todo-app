import { Component } from '@angular/core';
import { BoardService } from '../../services/board/board.service';

@Component({
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  boards$ = this.boardService.onFindAll();

  constructor(private boardService: BoardService) {
    this.boardService.findAll();
  }
}
