import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../../services/board/board.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Board } from '../../models/board.model';

@Component({
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
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
