import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../../services/board/board.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Board } from '../../models/board.model';

@Component({
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  board = toSignal(this.boardService.onFindOne());

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService
  ) {
    this.route.params.subscribe(({ id }) => {
      this.boardService.findOne(id);
    });
  }

  updateBoard(board: Board): void {
    this.boardService.update(board);
  }
}
