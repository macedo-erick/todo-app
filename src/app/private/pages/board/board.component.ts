import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../../services/board/board.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Board } from '../../models/board.model';
import { BoardComponent as BoardComponent_1 } from '../../components/board/board.component';

@Component({
    templateUrl: './board.component.html',
    styleUrl: './board.component.scss',
    standalone: true,
    imports: [BoardComponent_1]
})
export class BoardComponent implements OnInit {
  #route = inject(ActivatedRoute);
  #boardService = inject(BoardService);

  board = toSignal(this.#boardService.onFindOne());

  ngOnInit(): void {
    this.#route.params.subscribe(({ id }) => {
      this.#boardService.findOne(id);
    });
  }

  onBoardChange(board: Board): void {
    this.#boardService.update(board);
  }
}
