import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../../services/board/board.service';

@Component({
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  board$ = this.boardService.onFindOne();

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService
  ) {
    this.route.params.subscribe(({ id }) => {
      this.boardService.findOne(id);
    });
  }
}
